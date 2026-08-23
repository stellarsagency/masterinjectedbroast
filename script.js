/* ============================================
   MASTER INJECTED BROAST - Professional JavaScript
   Premium Edition
   ============================================ */

// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAnimations();
    }, 2500);
});
document.body.style.overflow = 'hidden';

// ===== Custom Cursor =====
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button, .deal-card, .menu-item, .gallery-item, .feature-card, .specialty-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorRing) cursorRing.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorRing) cursorRing.classList.remove('hover');
    });
});

// ===== Navbar =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

// Scroll effect
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + '%';
});

// Mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = navbar.offsetHeight + 20;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Hero Particles =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (12 + Math.random() * 12) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}
createParticles();

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2500;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            counter.textContent = current.toLocaleString() + '+';
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    });
}

// Intersection Observer for counters
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

// ===== Minimal 3D Tilt =====
const tiltCards = document.querySelectorAll('.deal-card, .review-card, .menu-item');

tiltCards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Subtle Hero Parallax =====
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg-image');
const heroContent = document.querySelector('.hero-content');

if (heroSection && heroBg && heroContent) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        heroBg.style.transform = `translate(${x * -15}px, ${y * -15}px) scale(1.08)`;
        heroContent.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });
    heroSection.addEventListener('mouseleave', () => {
        heroBg.style.transform = 'scale(1.08)';
        heroContent.style.transform = '';
    });
}

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .specialty-card, .deal-card, .menu-item, .gallery-item, .contact-card, .testimonial');
    
    elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 80) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = el.style.transform || 'translateY(0)';
            }, index % 4 * 100);
        }
    });
}

// Initialize elements for scroll reveal
document.querySelectorAll('.feature-card, .specialty-card, .deal-card, .menu-item, .gallery-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
    setTimeout(revealOnScroll, 300);
});

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Order Form =====
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const deal = document.getElementById('deal');
        const dealText = deal.options[deal.selectedIndex].text;
        const address = document.getElementById('address').value;
        
        // Create success overlay
        const wrapper = document.querySelector('.order-form-wrapper');
        const successHTML = `
            <div class="form-success" style="text-align: center; padding: 60px 40px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--golden), var(--golden-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; font-size: 2rem; color: var(--black); animation: successPop 0.5s ease;">
                    <i class="fas fa-check"></i>
                </div>
                <h3 style="font-family: var(--font-display); font-size: 1.5rem; color: var(--golden); margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px;">Order Placed!</h3>
                <p style="color: var(--gray-light); margin-bottom: 10px;">Thank you, <strong style="color: var(--white);">${name}</strong>!</p>
                <p style="color: var(--gray-light); margin-bottom: 10px;">Your <strong style="color: var(--golden);">${dealText}</strong> is being prepared.</p>
                <p style="color: var(--gray); font-size: 0.9rem;">We'll contact you at ${phone} shortly.</p>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p style="font-family: var(--font-display); font-size: 0.8rem; color: var(--golden); letter-spacing: 2px; text-transform: uppercase;">MASTER INJECTED BROAST</p>
                </div>
            </div>
        `;
        wrapper.innerHTML = successHTML;
        
        // Add animation keyframe
        const style = document.createElement('style');
        style.textContent = '@keyframes successPop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }';
        document.head.appendChild(style);
    });
}

// ===== Parallax on Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBgImage = document.querySelector('.hero-bg-image');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBgImage && scrolled < window.innerHeight) {
        heroBgImage.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.9));
    }
});

// ===== Gallery Hover Effect =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        item.style.setProperty('--x', x + '%');
        item.style.setProperty('--y', y + '%');
    });
});

// ===== Init Animations =====
function initAnimations() {
    // Trigger scroll reveal after load
    setTimeout(revealOnScroll, 500);
    
    // Animate hero elements
    document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats').forEach((el, i) => {
        el.style.animationDelay = (i * 0.2) + 's';
    });
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===== Performance: Throttle scroll events =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
});

console.log('%c🍗 MASTER INJECTED BROAST', 'color: #d4af37; font-size: 24px; font-weight: bold; text-shadow: 2px 2px #c41e3a;');
console.log('%cInjected with Flavor, Fried to Perfection!', 'color: #888; font-size: 12px;');
