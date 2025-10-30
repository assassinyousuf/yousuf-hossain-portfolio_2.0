// ========================================
// DAILY QUOTES SYSTEM (GitHub Pages Compatible)
// ========================================

// Configuration
const QUOTES_STORAGE_KEY = 'portfolio_quotes';
const ADMIN_SESSION_KEY = 'admin_session';

// Password Configuration
// For better security, use a hashed password. You can generate one at:
// https://www.browserling.com/tools/sha256-hash
const ADMIN_PASSWORD_HASH = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'; // SHA-256 of empty string - CHANGE THIS!
// To generate your password hash:
// 1. Visit: https://emn178.github.io/online-tools/sha256.html
// 2. Enter your password
// 3. Copy the hash and paste it above
// Example: SHA-256 of "yousuf2025" = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"

// Or use plain text password (less secure):
const ADMIN_PASSWORD_PLAIN = "yousuf2025"; // Change this to your password
const USE_PASSWORD_HASH = false; // Set to true to use hash, false for plain text

// Admin state
let isAdminLoggedIn = false;

// ========================================
// QUOTES STORAGE FUNCTIONS (localStorage)
// ========================================

// Get all quotes from localStorage
function getQuotes() {
  const quotesJSON = localStorage.getItem(QUOTES_STORAGE_KEY);
  return quotesJSON ? JSON.parse(quotesJSON) : [];
}

// Save quotes to localStorage
function saveQuotes(quotes) {
  localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes));
}

// Add a new quote
function addQuote(text) {
  const quotes = getQuotes();
  const newQuote = {
    id: Date.now().toString(),
    text: text.trim(),
    timestamp: Date.now()
  };
  quotes.push(newQuote);
  saveQuotes(quotes);
  return newQuote;
}

// Delete a quote by ID
function deleteQuoteById(quoteId) {
  const quotes = getQuotes();
  const filtered = quotes.filter(q => q.id !== quoteId);
  saveQuotes(filtered);
}

// Get the most recent quote
function getMostRecentQuote() {
  const quotes = getQuotes();
  if (quotes.length === 0) return null;
  return quotes.reduce((latest, current) => 
    current.timestamp > latest.timestamp ? current : latest
  );
}

// ========================================
// QUOTES UI FUNCTIONS
// ========================================

function initDailyQuotes() {
  loadTodaysQuote();
  loadAllQuotes();
  setupQuotesEventListeners();
  checkAdminSession();
}

// Load today's quote (most recent)
function loadTodaysQuote() {
  const quoteTextEl = document.getElementById('todaysQuoteText');
  const quoteDateEl = document.getElementById('todaysQuoteDate');
  // Optional compact aside widget
  const quoteTextAside = document.getElementById('todaysQuoteTextAside');
  const quoteDateAside = document.getElementById('todaysQuoteDateAside');
  
  const recentQuote = getMostRecentQuote();
  
  if (recentQuote) {
    const date = new Date(recentQuote.timestamp);
    const textVal = (recentQuote.text && typeof recentQuote.text === 'string')
      ? recentQuote.text.trim()
      : '';

    if (quoteTextEl) {
      quoteTextEl.textContent = textVal || "No quote text available.";
      quoteTextEl.classList.add('fade-in');
    }
    if (quoteDateEl) {
      quoteDateEl.textContent = formatDate(date);
    }

    if (quoteTextAside) {
      quoteTextAside.textContent = textVal || "No quote text available.";
      quoteTextAside.classList.add('fade-in');
    }
    if (quoteDateAside) {
      quoteDateAside.textContent = formatDate(date);
    }
  } else {
    const emptyMsg = "No quotes yet. Login and be the first to add one!";
    if (quoteTextEl) quoteTextEl.textContent = emptyMsg;
    if (quoteDateEl) quoteDateEl.textContent = "";
    if (quoteTextAside) quoteTextAside.textContent = emptyMsg;
    if (quoteDateAside) quoteDateAside.textContent = "";
  }
}

// Load all quotes
function loadAllQuotes() {
  const listEl = document.getElementById('allQuotesList');
  const quotes = getQuotes();
  
  listEl.innerHTML = '';
  
  if (quotes.length === 0) {
    listEl.innerHTML = '<div class="no-quotes">No quotes available yet.</div>';
    return;
  }
  
  // Sort by timestamp (newest first)
  const sortedQuotes = quotes.sort((a, b) => b.timestamp - a.timestamp);
  
  sortedQuotes.forEach(quote => {
    const quoteItem = createQuoteItem(quote);
    listEl.appendChild(quoteItem);
  });
}

// Create quote item element
function createQuoteItem(quote) {
  const div = document.createElement('div');
  div.className = 'quote-item';
  
  const textDiv = document.createElement('div');
  textDiv.className = 'quote-item-text';
  textDiv.textContent = quote.text;
  
  const metaDiv = document.createElement('div');
  metaDiv.className = 'quote-item-meta';
  
  const dateSpan = document.createElement('span');
  dateSpan.className = 'quote-item-date';
  const date = new Date(quote.timestamp);
  dateSpan.textContent = formatDateTime(date);
  
  metaDiv.appendChild(dateSpan);
  
  // Add delete button if admin is logged in
  if (isAdminLoggedIn) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-quote-btn';
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.onclick = () => deleteQuote(quote.id);
    metaDiv.appendChild(deleteBtn);
  }
  
  div.appendChild(textDiv);
  div.appendChild(metaDiv);
  
  return div;
}

// Publish new quote
function publishQuote() {
  const input = document.getElementById('newQuoteInput');
  const text = input.value.trim();
  
  if (!text) {
    alert('Please enter a quote!');
    return;
  }
  
  if (text.length > 500) {
    alert('Quote is too long! Maximum 500 characters.');
    return;
  }
  
  addQuote(text);
  input.value = '';
  loadTodaysQuote();
  loadAllQuotes();
  showNotification('Quote published successfully! ✨');
}

// Delete quote
function deleteQuote(quoteId) {
  if (!confirm('Are you sure you want to delete this quote?')) {
    return;
  }
  
  deleteQuoteById(quoteId);
  loadTodaysQuote();
  loadAllQuotes();
  showNotification('Quote deleted successfully.');
}

// ========================================
// ADMIN AUTHENTICATION
// ========================================

// Simple password hashing (SHA-256)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Check if admin session is active
function checkAdminSession() {
  const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
  if (session === 'active') {
    showAdminControls();
  }
}

// Show admin login modal
function showAdminLoginModal() {
  document.getElementById('adminLoginModal').style.display = 'flex';
  document.getElementById('adminPasswordInput').value = '';
  document.getElementById('adminPasswordInput').focus();
  document.getElementById('loginError').style.display = 'none';
}

// Hide admin login modal
function hideAdminLoginModal() {
  document.getElementById('adminLoginModal').style.display = 'none';
  document.getElementById('adminPasswordInput').value = '';
  document.getElementById('loginError').style.display = 'none';
}

// Attempt admin login
async function attemptAdminLogin() {
  const passwordInput = document.getElementById('adminPasswordInput');
  const password = passwordInput.value;
  const errorEl = document.getElementById('loginError');
  
  let isValid = false;
  
  if (USE_PASSWORD_HASH) {
    // Use hashed password
    const hashedInput = await hashPassword(password);
    isValid = hashedInput === ADMIN_PASSWORD_HASH;
  } else {
    // Use plain text password
    isValid = password === ADMIN_PASSWORD_PLAIN;
  }
  
  if (isValid) {
    isAdminLoggedIn = true;
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'active');
    showAdminControls();
    hideAdminLoginModal();
    showNotification('Admin access granted! 🔓');
  } else {
    errorEl.textContent = 'Incorrect password. Please try again.';
    errorEl.style.display = 'block';
    passwordInput.value = '';
    passwordInput.focus();
  }
}

// Show admin controls
function showAdminControls() {
  isAdminLoggedIn = true;
  document.getElementById('adminControls').style.display = 'block';
  loadAllQuotes(); // Reload to show delete buttons
}

// Admin logout
function adminLogout() {
  isAdminLoggedIn = false;
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  document.getElementById('adminControls').style.display = 'none';
  loadAllQuotes(); // Reload to hide delete buttons
  showNotification('Logged out successfully.');
}

// ========================================
// EVENT LISTENERS
// ========================================

function setupQuotesEventListeners() {
  // Admin login button
  document.getElementById('adminLoginBtn').addEventListener('click', showAdminLoginModal);
  
  // Close modal
  document.getElementById('closeAdminModal').addEventListener('click', hideAdminLoginModal);
  
  // Login submit
  document.getElementById('adminLoginSubmit').addEventListener('click', attemptAdminLogin);
  
  // Enter key to login
  document.getElementById('adminPasswordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') attemptAdminLogin();
  });
  
  // Publish quote button
  document.getElementById('publishQuoteBtn').addEventListener('click', publishQuote);
  
  // Enter key in quote input to publish (Shift+Enter for new line)
  const quoteInput = document.getElementById('newQuoteInput');
  quoteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      publishQuote();
    }
  });
  
  // Character counter (if element exists)
  const charCountEl = document.getElementById('charCount');
  if (charCountEl) {
    quoteInput.addEventListener('input', () => {
      charCountEl.textContent = quoteInput.value.length;
    });
  }
  
  // Logout button
  document.getElementById('adminLogoutBtn').addEventListener('click', adminLogout);
  
  // Toggle quotes list
  const toggleBtn = document.getElementById('toggleQuotesBtn');
  const quotesList = document.getElementById('allQuotesList');
  const toggleIcon = document.getElementById('toggleIcon');
  let isCollapsed = false;
  
  toggleBtn.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
      quotesList.classList.add('collapsed');
      toggleIcon.textContent = '▶';
    } else {
      quotesList.classList.remove('collapsed');
      toggleIcon.textContent = '▼';
    }
  });
  
  // Click outside modal to close
  document.getElementById('adminLoginModal').addEventListener('click', (e) => {
    if (e.target.id === 'adminLoginModal') {
      hideAdminLoginModal();
    }
  });
  
  // Keyboard shortcut: Ctrl+L to open admin login
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      showAdminLoginModal();
    }
  });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatDate(date) {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}

function formatDateTime(date) {
  const dateStr = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  const timeStr = date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  return `${dateStr} at ${timeStr}`;
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: linear-gradient(135deg, rgba(57,255,20,0.95), rgba(0,255,255,0.95));
    color: #000;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(57,255,20,0.4);
    z-index: 10001;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    animation: slideInRight 0.4s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease-out';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);

// --- Visitor Counter ---
// Global unique visitor counter using CountAPI with per-browser uniqueness guard.
function initVisitorCounter() {
  const counterElement = document.getElementById('visitorCount');
  if (!counterElement) return;

  const COUNTAPI_BASE = 'https://api.countapi.xyz';
  const NAMESPACE = 'assassinyousuf_yousuf_hossain_portfolio';
  const KEY = 'site_unique_visitors';
  const UNIQUE_FLAG = 'portfolio_visitor_counted_v1';

  const localFallback = () => {
    // Fallback to local-only counter if network blocked
    const STORAGE_KEY = 'portfolio_visitor_count';
    const LAST_VISIT_KEY = 'portfolio_last_visit';
    let visitorCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY) || '0', 10);
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000;
    if (!lastVisit || now - lastVisit > ONE_HOUR) {
      visitorCount++;
      localStorage.setItem(STORAGE_KEY, String(visitorCount));
      localStorage.setItem(LAST_VISIT_KEY, String(now));
    }
    animateCounter(counterElement, visitorCount);
  };

  const createIfMissing = async () => {
    await fetch(`${COUNTAPI_BASE}/create?namespace=${encodeURIComponent(NAMESPACE)}&key=${encodeURIComponent(KEY)}&value=0`)
      .catch(() => {});
  };

  (async () => {
    try {
      let value = 0;
      const hasCounted = localStorage.getItem(UNIQUE_FLAG) === '1';
      if (!hasCounted) {
        // Increment (creates the key if missing)
        const res = await fetch(`${COUNTAPI_BASE}/hit/${NAMESPACE}/${KEY}`, { cache: 'no-store' });
        const data = await res.json();
        value = Number(data?.value || 0);
        localStorage.setItem(UNIQUE_FLAG, '1');
      } else {
        // Just read current value; ensure exists
        let res = await fetch(`${COUNTAPI_BASE}/get/${NAMESPACE}/${KEY}`, { cache: 'no-store' });
        if (!res.ok) {
          await createIfMissing();
          res = await fetch(`${COUNTAPI_BASE}/get/${NAMESPACE}/${KEY}`, { cache: 'no-store' });
        }
        const data = await res.json();
        value = Number(data?.value || 0);
      }
      animateCounter(counterElement, value);
    } catch (err) {
      // Network failed or blocked — fallback to local counter
      localFallback();
    }
  })();
}

function animateCounter(element, targetValue) {
  let currentValue = 0;
  const duration = 1500; // 1.5 seconds
  const increment = targetValue / (duration / 16); // 60fps
  
  const updateCounter = () => {
    currentValue += increment;
    if (currentValue < targetValue) {
      element.textContent = Math.floor(currentValue).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = targetValue.toLocaleString();
    }
  };
  
  updateCounter();
}

// --- Smooth Scroll for Navigation ---
function initSmoothScroll() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      let targetId = null;
      // Case 1: pure hash link (e.g., "#about")
      if (href.startsWith('#')) {
        targetId = href.slice(1);
      } else if (href.includes('#')) {
        // Case 2: same-page anchor like "/index.html#about" or "/#about"
        try {
          const url = new URL(href, window.location.href);
          const sameOrigin = url.origin === window.location.origin;
          const samePath = url.pathname === window.location.pathname;
          if (sameOrigin && samePath && url.hash) {
            targetId = url.hash.slice(1);
          }
        } catch (_) {
          // If URL parsing fails, fall back to default behavior
        }
      }

      if (!targetId) return; // Not an in-page anchor; allow default navigation

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      // It's an in-page anchor — perform smooth scroll
      e.preventDefault();
      const sticky = document.querySelector('.sticky-nav');
      const navHeight = sticky ? sticky.offsetHeight : 0;
      const targetPosition = targetElement.offsetTop - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Highlight active link
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// --- Highlight Active Section on Scroll ---
function initScrollHighlight() {
  const sections = document.querySelectorAll('.card[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const sticky = document.querySelector('.sticky-nav');
    const navHeight = sticky ? sticky.offsetHeight : 0;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// --- Basic UI wiring ---
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle: Tsushima cinematic mode
  const THEME_KEY = 'portfolio_theme';
  const themeBtn = document.getElementById('themeToggle');

  function updateThemeToggleLabel() {
    if (!themeBtn) return;
    const tsu = document.body.classList.contains('theme-tsushima');
    themeBtn.textContent = tsu ? '🌌 Default' : '🌅 Tsushima';
  }

  function ensureTsushimaScene() {
    const scene = document.querySelector('.tsushima-scene');
    if (!scene) return;
    scene.classList.add('active');
    // If not populated yet, create fog layers and leaves
    if (!scene.dataset.built) {
      // Sun
      const sun = document.createElement('div');
      sun.className = 'tsu-sun';
      scene.appendChild(sun);
      // Mountains
      const mountains = document.createElement('div');
      mountains.className = 'tsu-mountains';
      scene.appendChild(mountains);
      for (let i=1;i<=3;i++) {
        const m = document.createElement('div');
        m.className = 'm m' + i;
        mountains.appendChild(m);
      }
      // Fog layers
      for (let i=1;i<=3;i++) {
        const fog = document.createElement('div');
        fog.className = 'tsu-fog f'+i;
        scene.appendChild(fog);
      }
      // Leaves
      const leafCount = 14;
      for (let i=0;i<leafCount;i++) {
        const leaf = document.createElement('span');
        leaf.className = 'tsu-leaf';
        leaf.style.setProperty('--i', i);
        leaf.style.left = Math.random()*100 + 'vw';
        leaf.style.animationDelay = (Math.random()*6).toFixed(2) + 's';
        leaf.style.animationDuration = (8 + Math.random()*8).toFixed(2) + 's';
        scene.appendChild(leaf);
      }
      scene.dataset.built = '1';
    }
  }

  function setTheme(mode) {
    const tsu = mode === 'tsushima';
    document.body.classList.toggle('theme-tsushima', tsu);
    localStorage.setItem(THEME_KEY, mode);
    if (tsu) ensureTsushimaScene();
    updateThemeToggleLabel();
  }

  const savedTheme = localStorage.getItem(THEME_KEY) || 'default';
  setTheme(savedTheme);
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const tsu = document.body.classList.contains('theme-tsushima');
      setTheme(tsu ? 'default' : 'tsushima');
    });
  }
  // Initialize Daily Quotes System
  // Only initialize if quotes UI exists on this page
  const hasQuotesUI = document.getElementById('todaysQuoteText') && document.getElementById('allQuotesList') && document.getElementById('newQuoteInput');
  if (hasQuotesUI) initDailyQuotes();
  // Ensure the compact aside widget is populated even if main quotes UI is absent
  const hasAsideQuote = document.getElementById('todaysQuoteTextAside');
  if (hasAsideQuote && !hasQuotesUI) {
    // Minimal populate for sidebar
    loadTodaysQuote();
  }
  
  // Initialize visitor counter
  initVisitorCounter();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize scroll highlight
  initScrollHighlight();
  
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Intersection observer for cards entrance
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.18 });
  document.querySelectorAll('.card').forEach((el, idx) => {
    // Stagger inside-project items using CSS variable
    const projects = el.querySelectorAll('.project');
    projects.forEach((p, i) => p.style.setProperty('--delay', `${Math.min(i * 0.08, 0.6)}s`));
    observer.observe(el);
  });

  // Modal handling
  const backdrop = document.getElementById('modalBackdrop');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const modalReset = document.getElementById('modalReset');

  const openHack = document.getElementById('openHack');
  const openVirus = document.getElementById('openVirus');
  const openMemory = document.getElementById('openMemory');

  const gameHack = document.getElementById('gameHack');
  const gameVirus = document.getElementById('gameVirus');
  const gameMemory = document.getElementById('gameMemory');

  function openModal(game) {
    // hide all
    gameHack.style.display = 'none';
    gameVirus.style.display = 'none';
    gameMemory.style.display = 'none';
    // show selected
    if (game === 'hack') {
      gameHack.style.display = 'block';
      modalTitle.textContent = '🎯 Hack the Code';
      modalSubtitle.textContent = 'Guess the 4-digit code in as few attempts as possible.';
      initHack(); // initialize
    } else if (game === 'virus') {
      gameVirus.style.display = 'block';
      modalTitle.textContent = '🦠 Avoid the Virus';
      modalSubtitle.textContent = 'Use arrow keys to dodge incoming viruses.';
      initVirus(); // initialize
    } else if (game === 'memory') {
      gameMemory.style.display = 'block';
      modalTitle.textContent = '🧠 Memory Match';
      modalSubtitle.textContent = 'Find all matching pairs.';
      initMemory();
    }
    backdrop.classList.add('show');
    backdrop.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    backdrop.classList.remove('show');
    backdrop.setAttribute('aria-hidden', 'true');
    // Reset games on close
    resetHack();
    resetVirus();
    resetMemory();
  }

  if (openHack) openHack.addEventListener('click', () => openModal('hack'));
  if (openVirus) openVirus.addEventListener('click', () => openModal('virus'));
  if (openMemory) openMemory.addEventListener('click', () => openModal('memory'));
  // Nav pinned quick game buttons
  document.querySelectorAll('.nav-game-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const g = btn.getAttribute('data-game');
      openModal(g);
    });
  });
  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // modal reset button will reset current game
  modalReset.addEventListener('click', () => {
    if (gameHack.style.display === 'block') resetHack();
    if (gameVirus.style.display === 'block') resetVirus();
    if (gameMemory.style.display === 'block') resetMemory();
  });

  // ------------------------------
  // GAME 1: Hack the Code
  // ------------------------------
  let secretCode = '';
  let attemptsLeft = 6;
  const guessInput = document.getElementById('guessInput');
  const guessBtn = document.getElementById('guessBtn');
  const hintBtn = document.getElementById('hintBtn');
  const guessLog = document.getElementById('guessLog');
  const attemptsLeftEl = document.getElementById('attemptsLeft');
  const hackStatus = document.getElementById('hackStatus');
  const hackSecretDisplay = document.getElementById('hackSecretDisplay');

  function randomCode() {
    // random 4-digit code, leading zeros allowed
    return String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  }

  function initHack() {
    secretCode = randomCode();
    attemptsLeft = 6;
    hintsUsed = 0;
    guessLog.innerHTML = '';
    attemptsLeftEl.textContent = 'Attempts left: ' + attemptsLeft;
    hackStatus.textContent = 'Try to hack the code! Use hints strategically.';
    guessInput.value = '';
    // masked display
    hackSecretDisplay.querySelectorAll('.digit').forEach(d => d.textContent = '•');
  }

  function showGuessResult(guess, resultText) {
    const el = document.createElement('div');
    el.style.color = 'var(--muted)';
    el.style.fontSize = '13px';
    el.textContent = `${guess} — ${resultText}`;
    guessLog.prepend(el);
  }

  function evaluateGuess(guess) {
    if (!/^\d{4}$/.test(guess)) {
      hackStatus.textContent = 'Enter exactly 4 digits.';
      return;
    }
    if (attemptsLeft <= 0) return;
    attemptsLeft--;
    attemptsLeftEl.textContent = 'Attempts left: ' + attemptsLeft;

    if (guess === secretCode) {
      hackStatus.textContent = 'Success — Code cracked!';
      hackSecretDisplay.querySelectorAll('.digit').forEach((d,i) => d.textContent = secretCode[i]);
      showGuessResult(guess, 'Correct! 🎉');
    } else {
      let correctPos = 0;
      for (let i=0;i<4;i++) if (guess[i] === secretCode[i]) correctPos++;
      const sumGuess = guess.split('').reduce((s,c)=>s+Number(c),0);
      const sumSecret = secretCode.split('').reduce((s,c)=>s+Number(c),0);
      const sumDiff = Math.abs(sumGuess - sumSecret);
      showGuessResult(guess, `Correct positions: ${correctPos}. Sum diff: ${sumDiff}`);
      hackStatus.textContent = attemptsLeft > 0 ? 'Try again...' : `Out of attempts — code was ${secretCode}`;
      if (attemptsLeft === 0) {
        hackSecretDisplay.querySelectorAll('.digit').forEach((d,i) => d.textContent = secretCode[i]);
      }
    }
  }

  guessBtn.addEventListener('click', () => {
    const v = guessInput.value.trim();
    evaluateGuess(v);
    guessInput.value = '';
    guessInput.focus();
  });
  guessInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') guessBtn.click(); });

  let hintsUsed = 0;
  hintBtn.addEventListener('click', () => {
    if (hintsUsed >= 3) {
      hackStatus.textContent = 'No more hints available!';
      setTimeout(() => hackStatus.textContent = '', 2000);
      return;
    }
    
    hintsUsed++;
    let hintText = '';
    
    switch(hintsUsed) {
      case 1:
        // First hint: Sum of all digits
        const sum = secretCode.split('').reduce((a,b) => a + parseInt(b), 0);
        hintText = `Sum of all digits is ${sum}`;
        break;
      case 2:
        // Second hint: First digit and if any digits repeat
        const hasRepeats = new Set(secretCode).size < 4;
        hintText = `First digit is ${secretCode[0]}. ${hasRepeats ? 'Some digits repeat' : 'All digits are different'}`;
        break;
      case 3:
        // Third hint: Range info and even/odd count
        const evenCount = secretCode.split('').filter(d => parseInt(d) % 2 === 0).length;
        const max = Math.max(...secretCode.split(''));
        hintText = `Highest digit is ${max}. Contains ${evenCount} even digits`;
        break;
    }
    
    hackStatus.textContent = `Hint ${hintsUsed}/3: ${hintText}`;
    setTimeout(() => hackStatus.textContent = '', 5000);
  });

  // ------------------------------
  // GAME 2: Avoid the Virus (Canvas)
  // ------------------------------
  const canvas = document.getElementById('virusCanvas');
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('startVirus');
  const pauseBtn = document.getElementById('pauseVirus');
  const resetBtn = document.getElementById('resetVirus');
  const virusScoreEl = document.getElementById('virusScore');
  const virusBestEl = document.getElementById('virusBest');

  let running = false;
  let paused = false;
  let animationId = null;
  let player = { x: canvas.width/2, y: canvas.height - 36, r: 12, speed: 4 };
  let bullets = [];
  let spawnTimer = 0;
  let score = 0;
  let bestScore = Number(localStorage.getItem('virusBest') || 0);

  function resetVirus() {
    running = false; paused = false;
    bullets = []; spawnTimer = 0; score = 0;
    player.x = canvas.width/2; player.y = canvas.height - 36;
    virusScoreEl.textContent = score;
    cancelAnimationFrame(animationId);
    drawVirusFrame();
  }

  function initVirus() {
    resetVirus();
    const maxW = Math.min(900, window.innerWidth - 80);
    canvas.width = Math.max(560, Math.min(900, maxW));
    canvas.height = Math.round(canvas.width * 0.5);
    player.x = canvas.width/2;
    player.y = canvas.height - 36;
    drawVirusFrame();
  }

  function drawVirusFrame() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    const g = ctx.createLinearGradient(0,0,0,canvas.height);
    g.addColorStop(0,'rgba(0,255,255,0.02)');
    g.addColorStop(1,'rgba(57,255,20,0.01)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // player
    ctx.beginPath();
    const grad = ctx.createRadialGradient(player.x, player.y, 2, player.x, player.y, player.r*2);
    grad.addColorStop(0, 'rgba(57,255,20,1)');
    grad.addColorStop(1, 'rgba(0,255,255,0.08)');
    ctx.fillStyle = grad;
    ctx.arc(player.x, player.y, player.r, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,255,255,0.18)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // viruses
    bullets.forEach(b => {
      ctx.beginPath();
      const g2 = ctx.createRadialGradient(b.x, b.y, 1, b.x, b.y, b.r*2);
      g2.addColorStop(0, 'rgba(255,60,60,1)');
      g2.addColorStop(1, 'rgba(255,60,60,0.08)');
      ctx.fillStyle = g2;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.fill();
    });
  }

  function gameLoop(timestamp) {
    if (!running || paused) return;
    spawnTimer--;
    if (spawnTimer <= 0) {
      spawnTimer = Math.max(12, 60 - Math.floor(score / 10));
      const r = 8 + Math.random() * 12;
      const x = Math.random() * (canvas.width - 2*r) + r;
      bullets.push({ x, y: -r, r, vy: 1 + Math.random()*1.6 + score*0.01 });
    }

    bullets.forEach(b => b.y += b.vy);
    bullets = bullets.filter(b => b.y - b.r < canvas.height + 40);

    for (let b of bullets) {
      const dx = b.x - player.x;
      const dy = b.y - player.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < b.r + player.r) {
        running = false;
        cancelAnimationFrame(animationId);
        if (score > bestScore) {
          bestScore = score;
          localStorage.setItem('virusBest', bestScore);
          virusBestEl.textContent = bestScore;
        }
        alert('You got hit! Score: ' + score);
        return;
      }
    }

    score += 1;
    virusScoreEl.textContent = score;
    drawVirusFrame();
    animationId = requestAnimationFrame(gameLoop);
  }

  const keys = {};
  document.addEventListener('keydown', e => { keys[e.key] = true; });
  document.addEventListener('keyup', e => { keys[e.key] = false; });

  function virusControlTick() {
    if (!running) return;
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) player.x += player.speed;
    player.x = Math.max(player.r, Math.min(canvas.width - player.r, player.x));
    setTimeout(virusControlTick, 16);
  }

  startBtn.addEventListener('click', () => {
    if (!running) {
      running = true; paused = false; score = 0; bullets = []; spawnTimer = 0;
      virusScoreEl.textContent = score;
      virusControlTick();
      animationId = requestAnimationFrame(gameLoop);
    } else if (paused) {
      paused = false; virusControlTick();
      animationId = requestAnimationFrame(gameLoop);
    }
  });
  
  pauseBtn.addEventListener('click', () => { paused = !paused; });
  resetBtn.addEventListener('click', resetVirus);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left;
  });

  // ------------------------------
  // GAME 3: Memory Match
  // ------------------------------
  const memoryGrid = document.getElementById('memoryGrid');
  const startMem = document.getElementById('startMem');
  const resetMem = document.getElementById('resetMem');
  const memMovesEl = document.getElementById('memMoves');
  const memMatchesEl = document.getElementById('memMatches');

  const icons = ['🔐','🖥️','🗝️','🐞','🔒','📡','🧩','💾'];
  let memCards = [];
  let memFirst = null;
  let memSecond = null;
  let memLock = false;
  let memMoves = 0;
  let memMatches = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildMemory() {
    const double = icons.concat(icons);
    const set = shuffle(double.slice());
    memoryGrid.innerHTML = '';
    memCards = [];
    set.forEach((icon, idx) => {
      const c = document.createElement('div');
      c.className = 'card-mem';
      c.dataset.icon = icon;
      c.dataset.index = idx;
      c.textContent = '';
      c.addEventListener('click', onMemCardClick);
      memoryGrid.appendChild(c);
      memCards.push(c);
    });
    memFirst = memSecond = null;
    memLock = false;
    memMoves = 0;
    memMatches = 0;
    memMovesEl.textContent = memMoves;
    memMatchesEl.textContent = memMatches;
  }

  function onMemCardClick(e) {
    if (memLock) return;
    const c = e.currentTarget;
    if (c.classList.contains('flipped')) return;
    flipMemCard(c);
    if (!memFirst) {
      memFirst = c;
      return;
    }
    memSecond = c;
    memMoves++;
    memMovesEl.textContent = memMoves;
    
    if (memFirst.dataset.icon === memSecond.dataset.icon) {
      memMatches++;
      memMatchesEl.textContent = memMatches;
      memFirst = memSecond = null;
      if (memMatches === icons.length) {
        setTimeout(()=> alert('You matched all pairs! Moves: ' + memMoves), 300);
      }
    } else {
      memLock = true;
      setTimeout(() => {
        unflipMem(memFirst);
        unflipMem(memSecond);
        memFirst = memSecond = null;
        memLock = false;
      }, 700);
    }
  }

  function flipMemCard(c) {
    c.classList.add('flipped');
    c.textContent = c.dataset.icon;
  }

  function unflipMem(c) {
    c.classList.remove('flipped');
    c.textContent = '';
  }

  function resetMemory() {
    buildMemory();
  }

  function initMemory() {
    buildMemory();
  }

  startMem.addEventListener('click', resetMemory);
  resetMem.addEventListener('click', resetMemory);

  // Initialize everything
  initHack();
  initVirus();
  buildMemory();
});