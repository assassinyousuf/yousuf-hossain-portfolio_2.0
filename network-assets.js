window.NetworkAssets = {
  icons: {
    router: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="4"/><path d="M50 20v60M20 50h60" stroke="currentColor" stroke-width="4"/><path d="M30 30l40 40M70 30L30 70" stroke="currentColor" stroke-width="4"/></svg>`,
    switch: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="30" width="80" height="40" rx="5" stroke="currentColor" stroke-width="4"/><path d="M25 45h50M25 55h50" stroke="currentColor" stroke-width="2"/><circle cx="30" cy="50" r="3" fill="currentColor"/><circle cx="50" cy="50" r="3" fill="currentColor"/><circle cx="70" cy="50" r="3" fill="currentColor"/></svg>`,
    firewall: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" rx="4" stroke="currentColor" stroke-width="4"/><path d="M20 40h60M20 60h60M40 20v20M60 20v20M40 60v20M60 60v20M30 40v20M50 40v20M70 40v20" stroke="currentColor" stroke-width="4"/></svg>`,
    server: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="10" width="50" height="80" rx="5" stroke="currentColor" stroke-width="4"/><line x1="25" y1="30" x2="75" y2="30" stroke="currentColor" stroke-width="4"/><line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" stroke-width="4"/><line x1="25" y1="70" x2="75" y2="70" stroke="currentColor" stroke-width="4"/><circle cx="35" cy="20" r="3" fill="currentColor"/><circle cx="35" cy="40" r="3" fill="currentColor"/><circle cx="35" cy="60" r="3" fill="currentColor"/><circle cx="35" cy="80" r="3" fill="currentColor"/></svg>`,
    cloud: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 65c-8.284 0-15-6.716-15-15 0-7.854 6.03-14.298 13.712-14.945C31.545 24.321 40.06 17 50 17c10.45 0 19.24 7.973 20.785 18.232C78.471 36.31 85 43.435 85 52c0 8.284-6.716 15-15 15H30z" stroke="currentColor" stroke-width="4"/></svg>`,
    database: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="25" rx="30" ry="10" stroke="currentColor" stroke-width="4"/><path d="M20 25v50c0 5.523 13.431 10 30 10s30-4.477 30-10V25" stroke="currentColor" stroke-width="4"/><path d="M20 50c0 5.523 13.431 10 30 10s30-4.477 30-10" stroke="currentColor" stroke-width="4"/></svg>`,
    terminal: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="20" width="80" height="60" rx="5" stroke="currentColor" stroke-width="4"/><path d="M25 35l15 15-15 15M50 65h20" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  components: {
    // Defines standard HTML structures for network elements
    getIconHTML(iconName, color = 'var(--accent)', size = '40px') {
      return `<div style="width:${size}; height:${size}; color:${color}; display:inline-flex; align-items:center; justify-content:center;">${window.NetworkAssets.icons[iconName]}</div>`;
    },
    getBadge(text, iconName) {
      return `<div class="net-badge">${this.getIconHTML(iconName, 'currentColor', '16px')}<span>${text}</span></div>`;
    }
  }
};
