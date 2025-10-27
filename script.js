document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Intersection Observer for entrance animations - staggered
  const cards = document.querySelectorAll('.card.fade-in');
  if (cards.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const idx = Array.from(cards).indexOf(el);
          setTimeout(() => el.classList.add('visible'), idx * 80);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.18 });

    cards.forEach(c => observer.observe(c));
  }

  // small arrow hover micro animation (makes arrow slide) and click feedback
  document.querySelectorAll('.view-more').forEach(link => {
    link.addEventListener('mouseenter', () => link.style.transform = 'translateX(6px)');
    link.addEventListener('mouseleave', () => link.style.transform = '');

    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        link.style.opacity = '0.9';
        setTimeout(() => link.style.opacity = '', 250);
      }
    });
  });
});