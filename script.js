/**
 * PORTFOLIO PRO - FULL SCREEN IMMERSIVE ENGINE
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Inject intro icons
  const preloader = document.getElementById('preloader');
  if (preloader) {
    if (window.NetworkAssets) {
      document.getElementById('node-router').innerHTML = window.NetworkAssets.components.getIconHTML('router', '#00f0ff', '60px');
      document.getElementById('node-switch').innerHTML = window.NetworkAssets.components.getIconHTML('switch', '#b026ff', '60px');
      document.getElementById('node-firewall').innerHTML = window.NetworkAssets.components.getIconHTML('firewall', '#ff0055', '60px');
      document.getElementById('node-server').innerHTML = window.NetworkAssets.components.getIconHTML('server', '#00ffaa', '60px');
      document.getElementById('node-cloud').innerHTML = window.NetworkAssets.components.getIconHTML('cloud', '#00f0ff', '60px');
    }

    if (true || !sessionStorage.getItem('introPlayed')) {
      // Node sequence: Router(0), Switch(1), Firewall(2), Server(3), Cloud(4)
      const nodes = [
        document.getElementById('node-router'),
        document.getElementById('node-switch'),
        document.getElementById('node-firewall'),
        document.getElementById('node-server'),
        document.getElementById('node-cloud')
      ];
      
      const lines = [
        document.getElementById('line-1'),
        document.getElementById('line-2'),
        document.getElementById('line-3'),
        document.getElementById('line-4')
      ];
      
      // Ensure lines have transition
      lines.forEach(l => { if(l) l.style.transition = 'all 0.3s ease'; });

      document.body.style.overflow = 'hidden';
      const packetPositions = [ "30%", "50%", "70%", "90%" ];
      
      const runSequence = async () => {
        try {
          for (let i = 0; i < nodes.length; i++) {
            // Illuminate Node
            if (nodes[i]) {
              nodes[i].style.opacity = '1';
              nodes[i].style.color = '#00f0ff';
              nodes[i].style.transform = 'translate(-50%, -50%) scale(1.1)';
              setTimeout(() => { if(nodes[i]) nodes[i].style.transform = 'translate(-50%, -50%) scale(1)'; }, 200);
            }
            
            // If not the last node, animate the connecting line and a packet
            if (i < lines.length) {
              if (lines[i]) {
                lines[i].style.opacity = '1';
                lines[i].setAttribute('stroke', '#00f0ff');
              }
              
              // Animate packet via CSS transition
              const packet = document.getElementById(`packet-${i+1}`);
              if (packet) {
                packet.style.transition = 'all 0.3s linear';
                packet.style.opacity = '1';
                packet.style.left = packetPositions[i];
                setTimeout(() => { if(packet) packet.style.opacity = '0'; }, 250);
              }
              
              await new Promise(r => setTimeout(r, 300)); // wait for packet to travel
            }
          }

          document.getElementById('preloader-text').innerText = "NETWORK ONLINE";
          await new Promise(r => setTimeout(r, 500));
        } catch(e) {
          console.error("Intro animation error:", e);
        } finally {
          // Fade out preloader
          preloader.style.opacity = '0';
          setTimeout(() => {
            preloader.remove();
            document.body.style.overflow = '';
          }, 800);
          sessionStorage.setItem('introPlayed', 'true');
        }
      };
      
      runSequence();
    } else {
      preloader.remove();
    }
  }

  renderPortfolio();
  initImmersiveBackground();
  initDashboard();

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
  
  // --- TECH STACK MARQUEE ---
  const allSkills = data.skills.flatMap(cat => cat.items);
  const marqueeItems = [...allSkills, ...allSkills, ...allSkills, ...allSkills, ...allSkills, ...allSkills, ...allSkills, ...allSkills];
  const marqueeHTML = marqueeItems.map(skill => `<span>${skill}</span><span class="dot"></span>`).join('');

  wrap.innerHTML = `
    <!-- HERO SECTION -->
    <section class="section" id="hero">
      <div class="content-wrap hero-grid">
        <div class="hero-text">
          <h1>${data.profile.name}</h1>
          <p class="hero-lead">${data.profile.title}</p>
          <div class="hero-btns">
            <a href="#about" class="btn btn-primary">Explore My World</a>
            <a href="${data.profile.cv || 'youusf_cv.pdf'}" target="_blank" class="btn" style="border: 1px solid var(--glass-border); color:#fff;">View CV</a>
          </div>
        </div>
        <div class="hero-image">
          <div class="profile-container">
            <img src="${data.profile.avatar}" alt="${data.profile.name}">
          </div>
        </div>
      </div>
      <div class="tech-marquee-container">
        <div class="tech-marquee-content">
          ${marqueeHTML}
        </div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section class="section" id="about">
      <div class="content-wrap about-grid">
        <div class="about-left">
          <div class="huge-number">01</div>
          <div class="section-title">${data.summary.title}</div>
        </div>
        <div class="about-right about-text">
          ${data.summary.content.map(p => `<p style="margin-bottom:20px;">${p}</p>`).join('')}
        </div>
      </div>
    </section>

    <!-- SKILLS SERVER RACK SECTION -->
    <section class="section" id="skills">
      <div class="content-wrap">
        <div class="circuit-divider"></div>
        <div class="section-title">02. Infrastructure & Skills</div>
        
        <div class="server-rack-container">
          <div class="rack-cabinet">
            
            <!-- Router (Networking) -->
            <div class="rack-u u1" tabindex="0">
              <div class="faceplate router-face">
                <div class="ports">
                  <div class="port rx"></div>
                  <div class="port tx"></div>
                  <div class="port rx"></div>
                  <div class="port tx"></div>
                  <div class="port"></div>
                  <div class="port"></div>
                </div>
                <div class="brand">CISCO-NET</div>
              </div>
              <div class="rack-lcd">
                <h4>NETWORKING</h4>
                <p>${data.skills.find(s=>s.category.includes('Networking'))?.items.join(', ') || ''}</p>
                <p style="margin-top:5px; color:#ffaa00; font-size:0.75rem;">Learning: ${data.skills.find(s=>s.category.includes('Currently'))?.items.filter(i=>i.includes('CCNA')).join(', ')}</p>
              </div>
            </div>
            
            <!-- Firewall (Cybersecurity) -->
            <div class="rack-u u2" tabindex="0">
              <div class="faceplate firewall-face">
                <div class="vents"></div>
                <div class="brand">CYBER-SEC</div>
              </div>
              <div class="rack-lcd">
                <h4>CYBERSECURITY</h4>
                <p>${data.skills.find(s=>s.category.includes('Cyber'))?.items.join(', ') || ''}</p>
              </div>
            </div>

            <!-- Server (Linux/OS) -->
            <div class="rack-u u3" tabindex="0">
              <div class="faceplate server-face">
                <div class="drives">
                   <div class="drive active"></div>
                   <div class="drive active"></div>
                   <div class="drive active"></div>
                   <div class="drive"></div>
                </div>
                <div class="brand">LINUX-SYS</div>
              </div>
              <div class="rack-lcd">
                <h4>OPERATING SYSTEMS</h4>
                <p>${data.skills.find(s=>s.category.includes('Operating'))?.items.join(', ') || ''}</p>
                <p style="margin-top:5px; color:#00ffaa; font-size:0.75rem;">Tools: VMware, VirtualBox</p>
              </div>
            </div>

            <!-- Compute Node (Programming) -->
            <div class="rack-u u2" tabindex="0">
              <div class="faceplate compute-face">
                <div style="font-family:var(--font-mono); font-size:10px; color:var(--muted);">CPU: ACTIVE // RAM: 64GB</div>
                <div class="brand">PROG-CORE</div>
              </div>
              <div class="rack-lcd">
                <h4>PROGRAMMING & DEV</h4>
                <p>${data.skills.find(s=>s.category.includes('Programming'))?.items.join(', ') || ''}</p>
                <p style="margin-top:5px; color:#b026ff; font-size:0.75rem;">Tools: Git, VS Code, Android Studio, DB Systems</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section class="section" id="projects">
      <div class="content-wrap">
        <div class="circuit-divider"></div>
        <div class="section-title">03. Featured Works</div>
        
        <div class="audit-log-wrapper">
          <div class="audit-log-header">
            <div class="audit-col" style="flex: 0.5;">ID</div>
            <div class="audit-col target">PROJECT TITLE</div>
            <div class="audit-col action" style="flex:1.5;">ROLE / TECH</div>
            <div class="audit-col status">SOURCE</div>
          </div>
          <div class="audit-log-body">
            ${data.projects.map((proj, index) => {
              return `
              <div class="audit-row">
                <div class="audit-col" style="flex: 0.5; color:var(--muted); font-family:var(--font-mono); font-size:0.8rem;">PRJ-0${index + 1}</div>
                <div class="audit-col target" style="color:#fff;">${proj.title}</div>
                <div class="audit-col action" style="flex:1.5; color:var(--accent2);">${proj.role || 'PROJECT'}</div>
                <div class="audit-col status">
                  ${proj.link ? `
                    <a href="${proj.link}" target="_blank" style="color:var(--accent); text-decoration:none; font-family:var(--font-mono); font-size:0.8rem; display:flex; align-items:center; gap:5px; padding: 4px 8px; border: 1px solid var(--accent); border-radius: 4px; transition: all 0.2s;">
                      <i class="fab fa-github"></i> REPO
                    </a>
                  ` : '<span style="color:var(--muted);">N/A</span>'}
                </div>
              </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- PUBLICATIONS SECTION -->
    <section class="section" id="publications">
      <div class="content-wrap" style="max-width: 1000px;">
        <div class="circuit-divider"></div>
        <div class="section-title">04. Academic Research</div>
        <div class="research-accordion">
          ${data.publications.map((pub, idx) => `
            <div class="research-item">
              <button class="research-header" onclick="this.parentElement.classList.toggle('expanded')">
                <div class="research-meta">
                  <span class="research-id">PUB-0${idx + 1}</span>
                  <span class="research-venue">${pub.venue}</span>
                </div>
                <h4 class="research-title">${pub.title}</h4>
                <div class="research-authors">${pub.authors}</div>
                <i class="fas fa-chevron-down expand-icon"></i>
              </button>
              <div class="research-body">
                <div class="research-abstract">
                  <strong>ABSTRACT //</strong> ${pub.abstract}
                </div>
                <div class="research-actions">
                  <button class="btn btn-bibtex" onclick="copyBibtex(this, \`${pub.bibtex.replace(/`/g, '\\`').replace(/\n/g, '\\n')}\`)"><i class="fas fa-copy"></i> Copy BibTeX</button>
                </div>
                <pre class="bibtex-block"><code>${pub.bibtex}</code></pre>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- AFFILIATIONS & MEMBERSHIPS SECTION -->
    <section class="section" id="affiliations">
      <div class="content-wrap">
        <div class="circuit-divider"></div>
        <div class="section-title">05. Affiliations & Memberships</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
          ${data.affiliations.map(item => `
            <div style="background:var(--glass); padding:20px; border-radius:12px; border: 1px solid var(--glass-border); display: flex; align-items: flex-start; gap: 15px;">
              <i class="fas fa-id-badge" style="color:var(--accent); font-size: 1.5rem; margin-top: 5px;"></i>
              <div>
                <h4 style="font-size: 1.1rem; color: #fff; margin-bottom: 5px;">${item.role}</h4>
                <p style="font-size: 0.9rem; color: var(--muted); margin-bottom: 5px;">${item.org}</p>
                ${item.year ? `<span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent2);">${item.year}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- LEADERSHIP & ACTIVITIES SECTION -->
    <section class="section" id="leadership">
      <div class="content-wrap">
        <div class="circuit-divider"></div>
        <div class="section-title">06. Leadership & Activities</div>
        <div class="audit-log-wrapper">
          <div class="audit-log-header">
            <div class="audit-col timestamp">TIMESTAMP</div>
            <div class="audit-col target">TARGET SYSTEM</div>
            <div class="audit-col action">ACTION / ROLE</div>
            <div class="audit-col status">STATUS</div>
          </div>
          <div class="audit-log-body">
            ${data.leadership.map(item => {
              const isActive = item.year.includes('Present');
              const statusText = isActive ? 'ACTIVE' : 'ARCHIVED';
              const statusClass = isActive ? 'status-active' : 'status-archived';
              const yearText = item.year || '2024';
              return `
              <div class="audit-row">
                <div class="audit-col timestamp"><i class="fas fa-clock" style="margin-right:8px; opacity:0.5;"></i>${yearText}</div>
                <div class="audit-col target">${item.org}</div>
                <div class="audit-col action">${item.role}</div>
                <div class="audit-col status"><span class="status-indicator ${statusClass}"></span> ${statusText}</div>
              </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT & EDUCATION SECTION -->
    <section class="section" id="contact">
      <div class="content-wrap">
        <div class="circuit-divider"></div>
        <div class="section-title">07. Let's Connect</div>
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
              <a href="${data.profile.social.linkedin}" target="_blank" class="nav-link" style="text-align:left; background:var(--glass);">LINKEDIN / MDYOUSUFHOSSAINMEHRAB</a>
              <a href="mailto:${data.profile.email}" class="nav-link" style="text-align:left; background:var(--glass);">EMAIL / ${data.profile.email.toUpperCase()}</a>
            </div>
            <p style="margin-top:30px; font-size:0.9rem; color:var(--muted);">Available for cybersecurity research collaborations and professional security auditing.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER WORLD MAP -->
    <footer class="noc-footer" style="position:relative; width:100vw; height:400px; overflow:hidden; border-top:1px solid var(--glass-border); background:rgba(5,5,5,0.9); display:flex; align-items:center; justify-content:center; margin-top:100px;">
      <div style="position:absolute; inset:0; opacity:0.15; background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1000 500%22><path d=%22M100 200c50-50 100 0 150-20s100 40 150 0 100 20 150-20 100 40 150 0%22 stroke=%22%2300f0ff%22 fill=%22none%22 stroke-width=%222%22/><path d=%22M200 300c50-50 100 0 150-20s100 40 150 0 100 20 150-20%22 stroke=%22%23b026ff%22 fill=%22none%22 stroke-width=%222%22/><circle cx=%22100%22 cy=%22200%22 r=%225%22 fill=%22%2300f0ff%22/><circle cx=%22400%22 cy=%22180%22 r=%225%22 fill=%22%2300f0ff%22/><circle cx=%22200%22 cy=%22300%22 r=%225%22 fill=%22%23b026ff%22/><circle cx=%22500%22 cy=%22280%22 r=%225%22 fill=%22%23b026ff%22/></svg>'); background-size:cover; background-position:center;"></div>

    </footer>
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
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.section').forEach(el => observer.observe(el));

  // --- NAV SETUP ---
  const navLinks = document.getElementById('nav-links');
  const sections = ['hero', 'about', 'skills', 'projects', 'publications', 'affiliations', 'leadership', 'contact'];
  navLinks.innerHTML = sections.map(id => `
    <a href="#${id}" class="nav-link ${id==='hero'?'active':''}">${id.toUpperCase()}</a>
  `).join('');

  // --- DRAWER SETUP ---
  const drawerToggle = document.getElementById('drawer-toggle');
  const drawerMenu = document.getElementById('drawer-menu');
  const drawerClose = document.getElementById('drawer-close');

  if (drawerToggle && drawerMenu && drawerClose) {
    drawerToggle.addEventListener('click', () => {
      drawerMenu.classList.add('open');
    });
    
    drawerClose.addEventListener('click', () => {
      drawerMenu.classList.remove('open');
    });

    // Close drawer when a link is clicked
    const links = drawerMenu.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        drawerMenu.classList.remove('open');
      });
    });
  }

  // --- CYBER-SPINE ANIMATION ---
  const spine = document.querySelector('.cyber-spine');
  if (spine) {
    window.addEventListener('scroll', () => {
      // Parallax effect on the vertebrae
      const offset = window.scrollY * 0.4;
      spine.style.backgroundPosition = `0 0, 0 ${offset}px`;
      
      // Increase opacity slightly as user scrolls deeper
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = window.scrollY / (maxScroll || 1);
      spine.style.opacity = 0.15 + (scrollProgress * 0.2);
    });
  }

  // --- MOTION ANIMATIONS & NETWORK LINKS ---
  setTimeout(drawNetworkLinks, 500);
  window.addEventListener('resize', drawNetworkLinks);

  if (window.Motion) {
    const { animate, inView, stagger } = window.Motion;
    
    // Animate Hero text
    animate('.hero-text h1', { opacity: [0, 1], y: [50, 0] }, { duration: 0.8, easing: "ease-out" });
    animate('.hero-lead', { opacity: [0, 1] }, { duration: 0.8, delay: 0.3 });
    animate('.hero-btns', { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: 0.5 });
    
    // Animate Skill Nodes when in view
    inView('.network-map-container', () => {
      animate('.skill-node', 
        { opacity: [0, 1], scale: [0.5, 1] }, 
        { delay: stagger(0.15), duration: 0.5 }
      );
    });
  }
}

function drawNetworkLinks() {
  const container = document.querySelector('.network-map-container');
  const svg = document.querySelector('.net-links');
  const nodes = document.querySelectorAll('.skill-node');
  if(!container || !svg || nodes.length === 0) return;

  svg.innerHTML = '';
  const rect = container.getBoundingClientRect();
  const getCenter = (node) => {
    // Get style top/left percentages and convert to pixels since getBoundingClientRect might not be ready
    const left = parseFloat(node.style.left) / 100 * rect.width;
    const top = parseFloat(node.style.top) / 100 * rect.height;
    return { x: left, y: top };
  };

  const connections = [
    ['networking', 'linux'],
    ['networking', 'cyber'],
    ['linux', 'database'],
    ['linux', 'python'],
    ['cyber', 'cloud'],
    ['networking', 'cloud']
  ];

  connections.forEach(([id1, id2]) => {
    const n1 = document.querySelector(`.skill-node[data-id="${id1}"]`);
    const n2 = document.querySelector(`.skill-node[data-id="${id2}"]`);
    if(n1 && n2) {
      const p1 = getCenter(n1);
      const p2 = getCenter(n2);
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", p1.x);
      line.setAttribute("y1", p1.y);
      line.setAttribute("x2", p2.x);
      line.setAttribute("y2", p2.y);
      line.setAttribute("stroke", "rgba(0, 240, 255, 0.2)");
      line.setAttribute("stroke-width", "2");
      line.setAttribute("stroke-dasharray", "4 4");
      svg.appendChild(line);

      // Packet animation on the line
      const packet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      packet.setAttribute("r", "3");
      packet.setAttribute("fill", "#00f0ff");
      
      const animateEl = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
      animateEl.setAttribute("dur", (Math.random() * 2 + 2) + "s");
      animateEl.setAttribute("repeatCount", "indefinite");
      animateEl.setAttribute("path", `M ${p1.x},${p1.y} L ${p2.x},${p2.y}`);
      packet.appendChild(animateEl);
      svg.appendChild(packet);
    }
  });
}

// --- IMMERSIVE 3D NETWORK TOPOLOGY ---
function initImmersiveBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 800;

  // Configuration
  const particleCount = 200;
  const maxDistance = 150;
  const maxConnections = 600; 

  const particlesData = [];
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 1000;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const isCyan = Math.random() > 0.5;
    colors[i * 3] = isCyan ? 0.0 : 0.69;
    colors[i * 3 + 1] = isCyan ? 0.94 : 0.15;
    colors[i * 3 + 2] = 1.0;

    particlesData.push({
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1),
      numConnections: 0
    });
  }

  const pMaterial = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending
  });

  const pGeometry = new THREE.BufferGeometry();
  pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const particleSystem = new THREE.Points(pGeometry, pMaterial);
  scene.add(particleSystem);

  // Lines
  const segments = maxConnections * 2;
  const linePositions = new Float32Array(segments * 3);
  const lineColors = new Float32Array(segments * 3);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.03,
    blending: THREE.AdditiveBlending
  });

  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(linesMesh);

  // Mouse Interaction
  let mouse = new THREE.Vector2(-9999, -9999);
  let scrollY = 0;
  
  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Packets (small glowing spheres moving along connections)
  const packetCount = 15;
  const packetGeo = new THREE.SphereGeometry(2.5, 8, 8);
  const packetMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.9 });
  const packets = [];
  
  for(let i=0; i<packetCount; i++) {
    const p = new THREE.Mesh(packetGeo, packetMat);
    p.visible = false;
    scene.add(p);
    packets.push({ mesh: p, active: false, source: 0, target: 0, progress: 0 });
  }

  const raycaster = new THREE.Raycaster();
  const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

  function animate() {
    requestAnimationFrame(animate);

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < particleCount; i++) {
      particlesData[i].numConnections = 0;
    }

    // Move particles
    for (let i = 0; i < particleCount; i++) {
      const particleData = particlesData[i];
      positions[i * 3] += particleData.velocity.x;
      positions[i * 3 + 1] += particleData.velocity.y;
      positions[i * 3 + 2] += particleData.velocity.z;

      // Bounce
      if (positions[i * 3 + 1] < -1000 || positions[i * 3 + 1] > 1000) particleData.velocity.y = -particleData.velocity.y;
      if (positions[i * 3] < -1000 || positions[i * 3] > 1000) particleData.velocity.x = -particleData.velocity.x;
      if (positions[i * 3 + 2] < -500 || positions[i * 3 + 2] > 500) particleData.velocity.z = -particleData.velocity.z;
    }

    // Mouse interaction - pull nodes slightly toward cursor
    raycaster.setFromCamera(mouse, camera);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(mousePlane, intersectPoint);
    
    // Calculate connections
    for (let i = 0; i < particleCount; i++) {
      const particleData = particlesData[i];
      if (particleData.numConnections >= 6) continue;

      const p1 = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      
      // Pull to mouse
      if (intersectPoint.distanceTo(p1) < 200) {
        positions[i*3] += (intersectPoint.x - p1.x) * 0.02;
        positions[i*3+1] += (intersectPoint.y - p1.y) * 0.02;
      }

      for (let j = i + 1; j < particleCount; j++) {
        const particleDataB = particlesData[j];
        if (particleDataB.numConnections >= 6) continue;

        const p2 = new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        const dist = p1.distanceTo(p2);

        if (dist < maxDistance) {
          particleData.numConnections++;
          particleDataB.numConnections++;
          const alpha = 1.0 - dist / maxDistance;

          linePositions[vertexpos++] = positions[i * 3];
          linePositions[vertexpos++] = positions[i * 3 + 1];
          linePositions[vertexpos++] = positions[i * 3 + 2];
          linePositions[vertexpos++] = positions[j * 3];
          linePositions[vertexpos++] = positions[j * 3 + 1];
          linePositions[vertexpos++] = positions[j * 3 + 2];

          lineColors[colorpos++] = colors[i * 3] * alpha;
          lineColors[colorpos++] = colors[i * 3 + 1] * alpha;
          lineColors[colorpos++] = colors[i * 3 + 2] * alpha;
          lineColors[colorpos++] = colors[j * 3] * alpha;
          lineColors[colorpos++] = colors[j * 3 + 1] * alpha;
          lineColors[colorpos++] = colors[j * 3 + 2] * alpha;

          // Spawn packet occasionally
          if (Math.random() < 0.001) {
             const inactivePacket = packets.find(p => !p.active);
             if (inactivePacket) {
                inactivePacket.active = true;
                inactivePacket.mesh.visible = true;
                inactivePacket.source = i;
                inactivePacket.target = j;
                inactivePacket.progress = 0;
             }
          }
          numConnected++;
          if (numConnected >= maxConnections) break;
        }
      }
      if (numConnected >= maxConnections) break;
    }

    // Update Packets
    packets.forEach(p => {
       if(p.active) {
          p.progress += 0.015; 
          if(p.progress >= 1.0) {
             p.active = false;
             p.mesh.visible = false;
          } else {
             const src = new THREE.Vector3(positions[p.source*3], positions[p.source*3+1], positions[p.source*3+2]);
             const dst = new THREE.Vector3(positions[p.target*3], positions[p.target*3+1], positions[p.target*3+2]);
             const currentPos = src.clone().lerp(dst, p.progress);
             p.mesh.position.copy(currentPos);
          }
       }
    });

    linesMesh.geometry.setDrawRange(0, numConnected * 2);
    linesMesh.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.attributes.color.needsUpdate = true;
    particleSystem.geometry.attributes.position.needsUpdate = true;

    scene.rotation.y = scrollY * 0.0002;
    scene.rotation.x = scrollY * 0.0001;
    renderer.render(scene, camera);
  }
  
  animate();
}

// --- CORE UTILS ---

function initDashboard() {
  const modal = document.getElementById('dashboard-modal');
  const close = document.getElementById('close-dashboard');
  const formsContainer = document.getElementById('forms-container');
  const saveBtn = document.getElementById('save-dashboard');
  const exportBtn = document.getElementById('export-data');
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

  // Secret Shortcut: Ctrl + Shift + A
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyA') {
      e.preventDefault();
      openDashboard();
    }
  });

  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.onclick = () => {
      activeTab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDashboardForms();
    };
  });

  function renderDashboardForms() {
    const data = window.PORTFOLIO_DATA;
    if (!data) return;
    formsContainer.innerHTML = '';
    
    if (activeTab === 'identity') {
      formsContainer.innerHTML = `
        <div style="display:grid; gap:20px;">
          <div class="form-group"><label>Name</label><input type="text" id="edit-name" value="${data.profile.name}"></div>
          <div class="form-group"><label>Title</label><input type="text" id="edit-title" value="${data.profile.title}"></div>
          <div class="form-group"><label>Email</label><input type="text" id="edit-email" value="${data.profile.email}"></div>
        </div>
      `;
    } else if (activeTab === 'summary') {
      formsContainer.innerHTML = `<textarea id="edit-summary" style="width:100%; height:300px; background:rgba(0,0,0,0.2); color:#fff; border:1px solid var(--glass-border); padding:15px; border-radius:10px;">${data.summary.content.join('\n')}</textarea>`;
    } else if (activeTab === 'skills') {
      formsContainer.innerHTML = data.skills.map((s, i) => `
        <div style="margin-bottom:15px;">
          <input type="text" class="edit-skill-cat" data-index="${i}" value="${s.category}" style="margin-bottom:5px;">
          <input type="text" class="edit-skill-items" data-index="${i}" value="${s.items.join(', ')}">
        </div>
      `).join('');
    } else if (activeTab === 'projects') {
      formsContainer.innerHTML = data.projects.map((p, i) => `
        <div style="border-bottom:1px solid var(--glass-border); padding-bottom:15px; margin-bottom:15px;">
          <input type="text" class="edit-proj-title" data-index="${i}" value="${p.title}" style="margin-bottom:5px; font-weight:bold;">
          <textarea class="edit-proj-desc" data-index="${i}" style="width:100%; height:60px;">${p.description}</textarea>
          <input type="text" class="edit-proj-link" data-index="${i}" value="${p.link || ''}" placeholder="GitHub Repo Name">
        </div>
      `).join('');
    }
  }

  saveBtn.onclick = () => {
    const data = window.PORTFOLIO_DATA;
    if (activeTab === 'identity') {
      data.profile.name = document.getElementById('edit-name').value;
      data.profile.title = document.getElementById('edit-title').value;
      data.profile.email = document.getElementById('edit-email').value;
    } else if (activeTab === 'summary') {
      data.summary.content = document.getElementById('edit-summary').value.split('\n').filter(l => l.trim());
    } else if (activeTab === 'skills') {
      document.querySelectorAll('.edit-skill-cat').forEach((el, i) => {
        data.skills[i].category = el.value;
        data.skills[i].items = document.querySelectorAll('.edit-skill-items')[i].value.split(',').map(s => s.trim());
      });
    } else if (activeTab === 'projects') {
      document.querySelectorAll('.edit-proj-title').forEach((el, i) => {
        data.projects[i].title = el.value;
        data.projects[i].description = document.querySelectorAll('.edit-proj-desc')[i].value;
        data.projects[i].link = document.querySelectorAll('.edit-proj-link')[i].value;
      });
    }
    saveData(data);
    alert("Updated locally! Push to GitHub to make it permanent.");
    modal.classList.remove('show');
  };

  exportBtn.onclick = () => {
    const blob = new Blob([JSON.stringify(window.PORTFOLIO_DATA, null, 2)], {type : 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio_data.json';
    a.click();
  };

  if (close) close.onclick = () => modal.classList.remove('show');
}
