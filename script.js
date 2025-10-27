// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for entrance animations with staggered delay
const cards = document.querySelectorAll('.card.fade-in');
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const el = entry.target;
            const idx = Array.from(cards).indexOf(el);
            // Enhanced stagger effect with easing
            setTimeout(() => {
                el.classList.add('visible');
                el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }, idx * 100);
            obs.unobserve(el);
        }
    });
}, { 
    threshold: 0.2,
    rootMargin: '50px'
});

cards.forEach(card => observer.observe(card));

// Enhanced hover effects for view-more links
document.querySelectorAll('.view-more').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(4px)';
        const arrow = link.querySelector('.arrow');
        if (arrow) {
            arrow.style.transform = 'translateX(6px) rotate(10deg)';
        }
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = '';
        const arrow = link.querySelector('.arrow');
        if (arrow) {
            arrow.style.transform = '';
        }
    });
});

// Project cards interaction
document.querySelectorAll('.project').forEach(project => {
    // keep interactions minimal: CSS hover handles icon transforms
    project.addEventListener('mouseenter', () => {
        project.classList.add('hover');
    });
    project.addEventListener('mouseleave', () => {
        project.classList.remove('hover');
    });
});

// View details modal placeholder with enhanced feedback
document.querySelectorAll('.view-more[href="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        
        // Visual feedback animation
        link.style.transform = 'scale(0.95)';
        link.style.opacity = '0.8';
        
        setTimeout(() => {
            link.style.transform = '';
            link.style.opacity = '';
        }, 200);
        
        // Placeholder notification
        const notification = document.createElement('div');
        notification.textContent = 'Project details coming soon!';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--card-bg);
            color: var(--accent2);
            padding: 12px 24px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
});