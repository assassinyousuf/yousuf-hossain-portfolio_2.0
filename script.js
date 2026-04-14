/**
 * PORTFOLIO PRO CORE ENGINE
 * Dynamic Rendering & Visual Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();
  initCanvasBackground();
  initVisitorCounter();
  initSmoothScroll();
  initScrollHighlight();
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

  // 1. Render Header
  const header = document.getElementById('header-section');
  header.innerHTML = `
    <div class="avatar">
      <img src="${data.profile.avatar}" alt="${data.profile.name}" class="profile-pic">
    </div>
    <div>
      <h1>${data.profile.name}</h1>
      <p class="lead">${data.profile.title}</p>
      <p style="color:var(--muted); margin-top:8px;">
        ${data.profile.address}<br>
        <a href="mailto:${data.profile.email}" style="color:var(--accent); text-decoration:none;">${data.profile.email}</a> • ${data.profile.phone}
      </p>
    </div>
  `;

  // 2. Render Main Sections
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <article class="card" id="about">
      <div class="section-title">${data.summary.title}</div>
      ${data.summary.content.map(p => `<p>${p}</p>`).join('')}
    </article>

    <article class="card" id="skills">
      <div class="section-title">Technical Skills</div>
      <div class="skills-container">
        ${data.skills.map(cat => `
          <div class="skill-category">
            <h4>${cat.category}</h4>
            <div class="p-tags">
              ${cat.items.map(item => `<span class="tag">${item}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </article>

    <article class="card" id="projects">
      <div class="section-title">Featured Projects</div>
      <div class="projects">
        ${data.projects.map(proj => `
          <div class="project">
            <h4>${proj.title}</h4>
            <p>${proj.description}</p>
            <div class="p-tags">
              ${proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </article>

    <article class="card" id="publications">
      <div class="section-title">Publications</div>
      <div class="timeline">
        ${data.publications.map(pub => `
          <div class="timeline-item">
            <div class="timeline-date">${pub.status}</div>
            <div class="timeline-title">${pub.title}</div>
            <p class="timeline-desc">${pub.description}</p>
          </div>
        `).join('')}
      </div>
    </article>

    <article class="card" id="education">
      <div class="section-title">Education & Extracurriculars</div>
      <div class="timeline">
        ${data.education.map(edu => `
          <div class="timeline-item">
            <div class="timeline-date">${edu.date}</div>
            <div class="timeline-title">${edu.title}</div>
            <p class="timeline-desc">${edu.description}</p>
          </div>
        `).join('')}
      </div>
      <div class="section-title" style="margin-top: 32px;">Leadership & Activities</div>
      <ul style="color:var(--muted); margin-left:18px; line-height: 1.8;">
        ${data.leadership.map(l => `
          <li><strong style="color:#fff;">${l.role}</strong>, ${l.org} ${l.year ? `<em>${l.year}</em>` : ''}</li>
        `).join('')}
      </ul>
    </article>
  `;

  // 3. Render Aside & Socials
  const aside = document.getElementById('aside-content');
  aside.innerHTML = `
    <article class="card" style="position: sticky; top: 100px;">
      <div class="section-title">Profiles & CV</div>
      <div class="contact">
        <a href="${data.profile.social.github}" target="_blank" class="btn-link">GitHub Profile</a>
        <a href="${data.profile.social.linkedin}" target="_blank" class="btn-link">LinkedIn Profile</a>
        <a href="${data.profile.social.facebook}" target="_blank" class="btn-link">Facebook</a>
        <a href="youusf_cv.pdf" target="_blank" class="btn-link btn-primary" style="margin-top: 12px; color: #000;">Download CV</a>
      </div>
    </article>
    <article class="card" id="contact" style="position: sticky; top: 380px;">
      <div class="section-title">Let's Connect</div>
      <p>Open for collaborations and projects.</p>
      <div class="contact">
        <a href="mailto:${data.profile.email}" class="btn-link" style="border-color: rgba(34, 211, 238, 0.4);">Email Me</a>
        <a href="https://wa.me/${data.profile.phone.replace(/\D/g,'')}" target="_blank" class="btn-link">WhatsApp</a>
      </div>
    </article>
  `;

  // 4. Render Nav Links
  const navLinks = document.getElementById('nav-links');
  const sections = ['about', 'skills', 'projects', 'publications', 'education', 'contact'];
  navLinks.innerHTML = sections.map(id => `
    <a href="#${id}" class="nav-link ${id==='about'?'active':''}">${id.charAt(0).toUpperCase() + id.slice(1)}</a>
  `).join('');

  // Re-observe cards for animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.card').forEach(el => observer.observe(el));
}

// --- CANVAS BACKGROUND ---
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.fillStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
      particles.forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - dist / 100)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// --- ADMIN DASHBOARD LOGIC ---
function initDashboard() {
  const modal = document.getElementById('dashboard-modal');
  const trigger = document.getElementById('admin-trigger');
  const footerTrigger = document.getElementById('footer-admin-link');
  const close = document.getElementById('close-dashboard');
  const formsContainer = document.getElementById('dashboard-forms');
  const exportBtn = document.getElementById('export-btn');
  const saveBtn = document.getElementById('save-dashboard');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const titleEl = document.getElementById('current-tab-title');

  let activeTab = 'identity';

  const openDashboard = () => {
    const password = prompt("Enter Admin Password:");
    if (password === "yousuf") {
      modal.classList.add('show');
      renderDashboardForms();
    } else if (password !== null) {
      alert("Unauthorized access!");
    }
  };

  if (trigger) trigger.onclick = openDashboard;
  if (footerTrigger) footerTrigger.onclick = openDashboard;
  if (close) close.onclick = () => modal.classList.remove('show');
  
  // Tab Switching
  tabBtns.forEach(btn => {
    btn.onclick = () => {
      activeTab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (titleEl) titleEl.textContent = btn.textContent;
      renderDashboardForms();
    };
  });

  // Shortcut Ctrl+Shift+A
  window.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openDashboard();
    }
  });

  function renderDashboardForms() {
    const data = window.PORTFOLIO_DATA;
    formsContainer.innerHTML = ''; // Clear

    switch(activeTab) {
      case 'identity': renderIdentity(data); break;
      case 'summary': renderSummary(data); break;
      case 'skills': renderSkills(data); break;
      case 'projects': renderProjects(data); break;
      case 'publications': renderPublications(data); break;
      case 'timeline': renderTimeline(data); break;
      case 'social': renderSocial(data); break;
    }
  }

  // --- TAB RENDERERS ---

  function renderIdentity(data) {
    formsContainer.innerHTML = `
      <section>
        <h3>Basic Information</h3>
        <label>Full Name</label>
        <input type="text" value="${data.profile.name}" data-path="profile.name">
        <label>Professional Title</label>
        <input type="text" value="${data.profile.title}" data-path="profile.title">
        <label>Address</label>
        <input type="text" value="${data.profile.address}" data-path="profile.address">
        <label>Email</label>
        <input type="text" value="${data.profile.email}" data-path="profile.email">
        <label>Phone</label>
        <input type="text" value="${data.profile.phone}" data-path="profile.phone">
        <label>Avatar Filename</label>
        <input type="text" value="${data.profile.avatar}" data-path="profile.avatar">
      </section>
    `;
  }

  function renderSummary(data) {
    formsContainer.innerHTML = `
      <section>
        <h3>About Me</h3>
        <label>Section Title</label>
        <input type="text" value="${data.summary.title}" data-path="summary.title">
        <label>Content Paragraph 1</label>
        <textarea data-path="summary.content.0">${data.summary.content[0] || ''}</textarea>
        <label>Content Paragraph 2</label>
        <textarea data-path="summary.content.1">${data.summary.content[1] || ''}</textarea>
      </section>
    `;
  }

  function renderSkills(data) {
    let html = '<h3>Skill Categories</h3>';
    data.skills.forEach((cat, idx) => {
      html += `
        <div class="form-row">
          <div class="row-header">
            <input type="text" value="${cat.category}" data-path="skills.${idx}.category" style="margin:0; width:70%">
            <button class="btn-remove" onclick="window.dashboardActions.remove('skills', ${idx})">Delete Category</button>
          </div>
          <label>Skills (comma separated)</label>
          <input type="text" value="${cat.items.join(', ')}" data-path="skills.${idx}.items" data-type="array">
        </div>
      `;
    });
    html += `<button class="btn-add" onclick="window.dashboardActions.add('skills')">+ Add Skill Category</button>`;
    formsContainer.innerHTML = html;
  }

  function renderProjects(data) {
    let html = '<h3>Project List</h3>';
    data.projects.forEach((proj, idx) => {
      html += `
        <div class="form-row">
          <div class="row-header">
            <h4>Project #${idx + 1}</h4>
            <button class="btn-remove" onclick="window.dashboardActions.remove('projects', ${idx})">Delete Project</button>
          </div>
          <input type="text" value="${proj.title}" data-path="projects.${idx}.title" placeholder="Project Title">
          <textarea data-path="projects.${idx}.description" placeholder="Description">${proj.description}</textarea>
          <input type="text" value="${proj.tags.join(', ')}" data-path="projects.${idx}.tags" data-type="array" placeholder="Tags (comma separated)">
        </div>
      `;
    });
    html += `<button class="btn-add" onclick="window.dashboardActions.add('projects')">+ Add New Project</button>`;
    formsContainer.innerHTML = html;
  }

  function renderPublications(data) {
    let html = '<h3>Academic Papers</h3>';
    data.publications.forEach((pub, idx) => {
      html += `
        <div class="form-row">
          <div class="row-header">
            <input type="text" value="${pub.status}" data-path="publications.${idx}.status" style="margin:0; width:30%" placeholder="Status (e.g. Accepted)">
            <button class="btn-remove" onclick="window.dashboardActions.remove('publications', ${idx})">Delete</button>
          </div>
          <input type="text" value="${pub.title}" data-path="publications.${idx}.title" placeholder="Paper Title">
          <textarea data-path="publications.${idx}.description" placeholder="Subtitle/Description">${pub.description}</textarea>
        </div>
      `;
    });
    html += `<button class="btn-add" onclick="window.dashboardActions.add('publications')">+ Add Publication</button>`;
    formsContainer.innerHTML = html;
  }

  function renderTimeline(data) {
    let html = '<h3>Education</h3>';
    data.education.forEach((edu, idx) => {
      html += `
        <div class="form-row">
          <div class="row-header">
            <input type="text" value="${edu.date}" data-path="education.${idx}.date" style="margin:0; width:40%" placeholder="Date Range">
            <button class="btn-remove" onclick="window.dashboardActions.remove('education', ${idx})">Delete</button>
          </div>
          <input type="text" value="${edu.title}" data-path="education.${idx}.title" placeholder="Institution/Degree">
          <textarea data-path="education.${idx}.description" placeholder="Details">${edu.description}</textarea>
        </div>
      `;
    });
    html += `<button class="btn-add" onclick="window.dashboardActions.add('education')">+ Add Education Entry</button>`;
    
    html += '<h3 style="margin-top:40px;">Leadership & Activities</h3>';
    data.leadership.forEach((lead, idx) => {
      html += `
        <div class="form-row">
          <div class="row-header">
            <h4>Entry #${idx + 1}</h4>
            <button class="btn-remove" onclick="window.dashboardActions.remove('leadership', ${idx})">Delete</button>
          </div>
          <input type="text" value="${lead.role}" data-path="leadership.${idx}.role" placeholder="Role (e.g. Treasurer)">
          <input type="text" value="${lead.org}" data-path="leadership.${idx}.org" placeholder="Organization">
          <input type="text" value="${lead.year}" data-path="leadership.${idx}.year" placeholder="Year Range (optional)">
        </div>
      `;
    });
    html += `<button class="btn-add" onclick="window.dashboardActions.add('leadership')">+ Add Leadership Entry</button>`;
    formsContainer.innerHTML = html;
  }

  function renderSocial(data) {
    formsContainer.innerHTML = `
      <section>
        <h3>Social Media Links</h3>
        <label>GitHub URL</label>
        <input type="text" value="${data.profile.social.github}" data-path="profile.social.github">
        <label>LinkedIn URL</label>
        <input type="text" value="${data.profile.social.linkedin}" data-path="profile.social.linkedin">
        <label>Facebook URL</label>
        <input type="text" value="${data.profile.social.facebook}" data-path="profile.social.facebook">
      </section>
    `;
  }

  // --- ACTIONS ---

  window.dashboardActions = {
    add: (key) => {
      const data = window.PORTFOLIO_DATA;
      const templates = {
        skills: { category: "New Category", items: [] },
        projects: { title: "New Project", description: "", tags: [] },
        publications: { status: "Under Review", title: "New Paper", description: "" },
        education: { date: "Year", title: "Achievement", description: "" },
        leadership: { role: "Role", org: "Organization", year: "" }
      };
      data[key].push(templates[key]);
      renderDashboardForms();
    },
    remove: (key, idx) => {
      if(confirm('Are you sure you want to delete this item?')) {
        window.PORTFOLIO_DATA[key].splice(idx, 1);
        renderDashboardForms();
      }
    }
  };

  saveBtn.onclick = () => {
    const data = window.PORTFOLIO_DATA;
    const inputs = formsContainer.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      const path = input.dataset.path;
      if (!path) return;
      
      let val = input.value;
      if (input.dataset.type === 'array') {
        val = val.split(',').map(s => s.trim()).filter(s => s !== '');
      }
      
      setNestedValue(data, path, val);
    });
    
    saveData(data);
    alert("Live preview updated! (Check behind this window)");
  };

  exportBtn.onclick = () => {
    const cleanData = JSON.parse(JSON.stringify(window.PORTFOLIO_DATA));
    const dataStr = `const initialData = ${JSON.stringify(cleanData, null, 2)};\n\nwindow.PORTFOLIO_DATA = JSON.parse(localStorage.getItem('portfolio_config')) || initialData;\n\nconst saveData = (newData) => {\n  localStorage.setItem('portfolio_config', JSON.stringify(newData));\n  window.PORTFOLIO_DATA = newData;\n  if (typeof renderPortfolio === 'function') renderPortfolio();\n};`;
    const blob = new Blob([dataStr], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "data.js";
    a.click();
  };
}

function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

// --- VISITOR COUNTER --- (Simplified for this version)
function initVisitorCounter() {
  const el = document.getElementById('visitorCount');
  let count = localStorage.getItem('site_v_count') || 1337;
  count = parseInt(count) + 1;
  localStorage.setItem('site_v_count', count);
  el.textContent = count.toLocaleString();
}

// --- UI HELPERS ---
function initSmoothScroll() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
    };
  });
}

function initScrollHighlight() {
  window.onscroll = () => {
    const sections = document.querySelectorAll('article.card');
    let current = "";
    sections.forEach(s => {
      if (window.pageYOffset >= s.offsetTop - 150) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  };
}