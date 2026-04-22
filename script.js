/**
 * PORTFOLIO PRO - FULL SCREEN IMMERSIVE ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();
  initImmersiveBackground();
  initVisitorCounter();
  initDashboard();

  // Update year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  
  document.body.classList.remove('loading');
});

// --- DYNAMIC RENDERING ENGINE ---
function renderPortfolio() {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const wrap = document.querySelector('.wrap');
  // Clear the wrap and use it as our scroll container
  wrap.className = 'scroll-container'; 
  
  wrap.innerHTML = `
    <!-- HERO SECTION -->
    <section class="section" id="hero">
      <div class="content-wrap hero-content">
        <div class="profile-container">
          <img src="${data.profile.avatar}" alt="${data.profile.name}">
        </div>
        <h1>${data.profile.name}</h1>
        <p class="hero-lead">${data.profile.title}</p>
        <div style="display:flex; justify-content:center; gap:20px;">
          <a href="#about" class="btn btn-primary">Explore My World</a>
          <a href="${data.profile.cv || 'youusf_cv.pdf'}" target="_blank" class="btn" style="border: 1px solid var(--glass-border); color:#fff;">View CV</a>
        </div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section class="section" id="about">
      <div class="content-wrap">
        <div class="section-title">01. ${data.summary.title}</div>
        <div class="about-text">
          ${data.summary.content.map(p => `<p style="margin-bottom:20px;">${p}</p>`).join('')}
        </div>
      </div>
    </section>

    <!-- SKILLS SECTION -->
    <section class="section" id="skills">
      <div class="content-wrap">
        <div class="section-title">02. Technical Stack</div>
        <div class="skills-grid">
          ${data.skills.map(cat => `
            <div class="skill-cat">
              <h4>${cat.category}</h4>
              <div class="p-tags">
                ${cat.items.map(item => `<span class="tag">${item}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section class="section" id="projects">
      <div class="content-wrap" style="max-width: 1400px;">
        <div class="section-title">03. Featured Works</div>
        <div class="project-container">
          ${data.projects.map(proj => `
            <div class="project-item">
              <div style="color:var(--accent); font-family:var(--font-mono); font-size:0.7rem; margin-bottom:10px;">${proj.role || 'RESEARCHER'}</div>
              <h4>${proj.title}</h4>
              <p>${proj.description}</p>
              <div class="p-tags" style="margin-bottom: 20px;">
                ${proj.tags.map(tag => `<span class="tag" style="font-size:0.7rem;">${tag}</span>`).join('')}
              </div>
              ${proj.link ? `
                <a href="${proj.link}" target="_blank" class="btn" style="padding: 8px 16px; font-size: 0.8rem; border: 1px solid var(--accent); color: var(--accent);">
                  <i class="fab fa-github"></i> Source Code
                </a>
              ` : ''}
            </div>
          `).join('')}
        </div>
        <div style="margin-top:40px; color:var(--muted); font-size:0.8rem; text-align:center;">Swipe to navigate projects →</div>
      </div>
    </section>

    <!-- PUBLICATIONS SECTION -->
    <section class="section" id="publications">
      <div class="content-wrap">
        <div class="section-title">04. Academic Research</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
          ${data.publications.map(pub => `
            <div style="background:var(--glass); padding:30px; border-radius:20px; border: 1px solid var(--glass-border);">
              <div style="color:var(--accent); font-family:var(--font-mono); font-size:0.75rem; margin-bottom:10px;">${pub.status}</div>
              <h4 style="font-family:var(--font-heading); font-size:1.2rem; margin-bottom:10px; color:#fff;">${pub.title}</h4>
              <p style="font-size:0.9rem; color:var(--muted);">${pub.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CONTACT & EDUCATION SECTION -->
    <section class="section" id="contact">
      <div class="content-wrap">
        <div class="section-title">05. Let's Connect</div>
        <div class="contact-grid">
          <div>
            <h4 style="margin-bottom:20px; color:var(--accent2);">Education</h4>
            <div class="timeline">
              ${data.education.map(edu => `
                <div class="timeline-item">
                  <div class="timeline-date">${edu.date}</div>
                  <div class="timeline-title">${edu.title}</div>
                  <p style="font-size:0.8rem; color:var(--muted);">${edu.description.substring(0, 100)}...</p>
                </div>
              `).join('')}
            </div>
          </div>
          <div>
            <h4 style="margin-bottom:20px; color:var(--accent);">Social Identity</h4>
            <div style="display:grid; grid-template-columns: 1fr; gap:15px;">
              <a href="${data.profile.social.github}" target="_blank" class="nav-link" style="text-align:left; background:var(--glass);">GITHUB / ASSASSINYOUSUF</a>
              <a href="${data.profile.social.linkedin}" target="_blank" class="nav-link" style="text-align:left; background:var(--glass);">LINKEDIN / MD-YOUSUF-HOSSAIN-06089A328</a>
              <a href="mailto:${data.profile.email}" class="nav-link" style="text-align:left; background:var(--glass);">EMAIL / ${data.profile.email.toUpperCase()}</a>
            </div>
            <p style="margin-top:30px; font-size:0.9rem; color:var(--muted);">Available for cybersecurity research collaborations and professional security auditing.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  // --- REVEAL ANIMATIONS ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Update Nav
        const id = entry.target.id;
        document.querySelectorAll('.nav-link').forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.section').forEach(el => observer.observe(el));

  // --- NAV SETUP ---
  const navLinks = document.getElementById('nav-links');
  const sections = ['hero', 'about', 'skills', 'projects', 'publications', 'contact'];
  navLinks.innerHTML = sections.map(id => `
    <a href="#${id}" class="nav-link ${id==='hero'?'active':''}">${id.toUpperCase()}</a>
  `).join('');
}

// --- IMMERSIVE 3D STARFIELD ---
function initImmersiveBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 1000;

  // Stars
  const starsGeometry = new THREE.BufferGeometry();
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for(let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 2000;
    positions[i+1] = (Math.random() - 0.5) * 2000;
    positions[i+2] = (Math.random() - 0.5) * 2000;

    const r = 0.5 + Math.random() * 0.5;
    const g = 0.8 + Math.random() * 0.2;
    const b = 0.9 + Math.random() * 0.1;
    colors[i] = r; colors[i+1] = g; colors[i+2] = b;
  }
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const starsMaterial = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField);

  // Large Orbs for depth
  const orbGeo = new THREE.IcosahedronGeometry(100, 1);
  const orbMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.05 });
  const orbs = [];
  for(let i=0; i<5; i++) {
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set((Math.random()-0.5)*1500, (Math.random()-0.5)*1500, (Math.random()-0.5)*1000);
    scene.add(orb);
    orbs.push(orb);
  }

  // Interaction
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    
    // Constant rotation
    starField.rotation.y += 0.0005;
    starField.rotation.x += 0.0002;

    // Scroll Interaction: Move through stars
    camera.position.z = 1000 - (scrollY * 0.2);
    camera.rotation.z = scrollY * 0.0001;

    orbs.forEach(orb => {
        orb.rotation.y += 0.001;
        orb.rotation.x += 0.001;
    });

    renderer.render(scene, camera);
  }
  animate();
}

// --- CORE UTILS ---
function initVisitorCounter() {
  const el = document.getElementById('visitorCount');
  if (!el) return;
  let count = localStorage.getItem('site_v_count') || 1337;
  count = parseInt(count) + 1;
  localStorage.setItem('site_v_count', count);
  el.textContent = count.toLocaleString();
}

function initDashboard() {
  const trigger = document.getElementById('admin-trigger');
  const modal = document.getElementById('dashboard-modal');
  const close = document.getElementById('close-dashboard');

  const openDashboard = () => {
    const password = prompt("Enter Admin Password:");
    if (password === "yousuf") {
      modal.classList.add('show');
    } else if (password !== null) {
      alert("Unauthorized access!");
    }
  };

  if (trigger) trigger.onclick = openDashboard;
  if (close) close.onclick = () => modal.classList.remove('show');
}