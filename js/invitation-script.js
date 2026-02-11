// ============================================
// INVITATION PAGE SCRIPT
// ============================================

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const banner = document.querySelector('.invitation-banner');
                const bannerContent = document.querySelector('.banner-content');
                
                if (banner && bannerContent) {
                    // Parallax effect no banner
                    bannerContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                    bannerContent.style.opacity = 1 - (scrolled / 500);
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ============================================
// SMOOTH SCROLL TO LETTER
// ============================================
function initSmoothScroll() {
    const scrollHint = document.querySelector('.scroll-hint');
    
    if (scrollHint) {
        scrollHint.addEventListener('click', () => {
            const letterSection = document.querySelector('.invitation-letter');
            if (letterSection) {
                letterSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// ============================================
// WAX SEAL HOVER EFFECTS
// ============================================
function initSealEffects() {
    const seal = document.querySelector('.wax-seal');
    
    if (seal) {
        // Efeito de som ao passar o mouse (opcional - descomente se quiser adicionar)
        seal.addEventListener('mouseenter', () => {
            playHoverSound();
        });
        
        // Adicionar efeito de partículas ao clicar
        seal.addEventListener('click', (e) => {
            createClickEffect(e);
        });
    }
}

function createClickEffect(event) {
    const seal = event.currentTarget;
    const rect = seal.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Criar partículas de brilho
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 50 + Math.random() * 30;
        
        Object.assign(particle.style, {
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #f4d03f, #d4af37)',
            pointerEvents: 'none',
            zIndex: '1000',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)'
        });
        
        seal.appendChild(particle);
        
        // Animar partícula
        const animation = particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

// ============================================
// FLOATING ELEMENTS ANIMATION
// ============================================
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Adicionar movimento aleatório sutil
        const randomDelay = Math.random() * 2;
        const randomDuration = 8 + Math.random() * 4;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });
}

// ============================================
// INTERSECTION OBSERVER - Animações ao entrar na viewport
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos da carta
    const animatedElements = document.querySelectorAll(
        '.letter-greeting, .letter-text, .letter-details, .letter-quote, .wax-seal'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============================================
// PARTICLE BACKGROUND (opcional)
// ============================================
function createParticleBackground() {
    const banner = document.querySelector('.invitation-banner');
    if (!banner) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'background-particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        
        Object.assign(particle.style, {
            position: 'absolute',
            left: x + '%',
            top: y + '%',
            width: size + 'px',
            height: size + 'px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.3)',
            pointerEvents: 'none',
            animation: `floatParticle ${duration}s ease-in-out ${delay}s infinite`
        });
        
        banner.appendChild(particle);
    }
}

// Adicionar keyframes para as partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() + 0.5});
            opacity: 0.8;
        }
        90% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// PREVENT DOUBLE CLICK ON SEAL
// ============================================
function preventDoubleClick() {
    const seal = document.querySelector('.wax-seal');
    let clicking = false;
    
    if (seal) {
        seal.addEventListener('click', (e) => {
            if (clicking) {
                e.preventDefault();
                return false;
            }
            
            clicking = true;
            
            // Adicionar classe de loading
            seal.classList.add('seal-opening');
            
            setTimeout(() => {
                clicking = false;
            }, 1000);
        });
    }
}

// ============================================
// EASTER EGG - Konami Code
// ============================================
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Adicionar confete ou efeito especial
    const body = document.body;
    body.style.animation = 'rainbow 2s ease infinite';
    
    setTimeout(() => {
        body.style.animation = '';
    }, 5000);
    
    // Criar confete
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#5a7f5f', '#7a6a8f', '#d4af37', '#c6a7fe'];
    const x = Math.random() * window.innerWidth;
    const duration = Math.random() * 3 + 2;
    
    Object.assign(confetti.style, {
        position: 'fixed',
        left: x + 'px',
        top: '-20px',
        width: '10px',
        height: '10px',
        background: colors[Math.floor(Math.random() * colors.length)],
        transform: 'rotate(' + (Math.random() * 360) + 'deg)',
        zIndex: '9999',
        pointerEvents: 'none'
    });
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        {
            transform: `translateY(0) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`,
            opacity: 0
        }
    ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => confetti.remove();
}

// ============================================
// LOADING ANIMATION
// ============================================
function initLoadingAnimation() {
    const banner = document.querySelector('.invitation-banner');
    const letter = document.querySelector('.invitation-letter');
    
    if (banner) {
        banner.style.opacity = '0';
        setTimeout(() => {
            banner.style.transition = 'opacity 1s ease';
            banner.style.opacity = '1';
        }, 100);
    }
    
    if (letter) {
        letter.style.opacity = '0';
        setTimeout(() => {
            letter.style.transition = 'opacity 1s ease';
            letter.style.opacity = '1';
        }, 500);
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log(' Convite de casamento carregado!');
    
    // Inicializar todas as funcionalidades
    initLoadingAnimation();
    initParallax();
    initSmoothScroll();
    initSealEffects();
    initFloatingElements();
    initScrollAnimations();
    preventDoubleClick();
    initKonamiCode();
    
    // Opcional: criar fundo de partículas
    // createParticleBackground();
    
    // Log para debug
    console.log(' Todas as animações inicializadas');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Detectar se o usuário prefere movimento reduzido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    console.log(' Modo de movimento reduzido ativado');
}