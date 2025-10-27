document.querySelectorAll('.view-more').forEach(link => {
// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for entrance animations - staggered
const cards = document.querySelectorAll('.card.fade-in');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      // add visible and small stagger based on index
      const el = entry.target;
      const idx = Array.from(cards).indexOf(el);
      setTimeout(()=> el.classList.add('visible'), idx * 80);
      obs.unobserve(el);
    }
  });
}, { threshold: 0.18 });

cards.forEach(c => observer.observe(c));

// small arrow hover micro animation (makes arrow slide)
document.querySelectorAll('.view-more').forEach(link => {
  link.addEventListener('mouseenter', () => link.style.transform = 'translateX(4px)');
  link.addEventListener('mouseleave', () => link.style.transform = '');
});

// Optional: make "View details" links open modal or expand — placeholder
document.querySelectorAll('.view-more[href="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    // minimal feedback: simple effect
    a.style.opacity = 0.9;
    setTimeout(()=> a.style.opacity = '', 250);
  });
});