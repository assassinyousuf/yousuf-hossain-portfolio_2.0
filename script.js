// --- Basic UI wiring ---
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear?.() ?? new Date().getFullYear();

  // Intersection observer for cards entrance
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.18 });
  document.querySelectorAll('.card').forEach(el => observer.observe(el));

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

  openHack.addEventListener('click', () => openModal('hack'));
  openVirus.addEventListener('click', () => openModal('virus'));
  openMemory.addEventListener('click', () => openModal('memory'));
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