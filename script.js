// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.timeline-item').forEach(el => {
    observer.observe(el);
});

// Efecto de scroll suave en secciones
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    if (scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Animación de entrada para timeline items
const animateTimelineItems = () => {
    const items = document.querySelectorAll('.timeline-item');
    
    items.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        
        if (itemTop < window.innerHeight && itemBottom > 0) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

// Inicializar visibilidad de items
document.querySelectorAll('.timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', animateTimelineItems);
window.addEventListener('load', animateTimelineItems);
animateTimelineItems();

// Menu hamburguesa
const menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', () => {
    console.log('Menu opened');
});

// Smooth scroll para enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax efecto suave en hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollY = window.scrollY;
        const heroTop = hero.getBoundingClientRect().top;
        
        if (heroTop < window.innerHeight) {
            hero.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) heroContent.classList.add('in-view');
    if (heroImage) heroImage.classList.add('in-view');
});