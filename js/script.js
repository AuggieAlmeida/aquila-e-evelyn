// ============================================
// CONFIGURAÇÃO E CONSTANTES
// ============================================
const CONFIG = {
    weddingDate: new Date('2026-05-03T16:00:00').getTime(),
    apiEndpoint: '/api/depoimentos',
    animationDelay: 100
};

// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
    const now = new Date().getTime();
    const distance = CONFIG.weddingDate - now;

    if (distance < 0) {
        document.querySelector('.countdown').innerHTML = 
            '<h3 style="font-size: 2rem; color: var(--color-primary);">O grande dia chegou! 🎉</h3>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// ============================================
// CAROUSEL DE PRESENTES
// ============================================
let currentSlide = 0;
const carouselTrack = document.getElementById('carouselTrack');
let totalSlides = carouselTrack ? carouselTrack.children.length : 0;

function initCarousel() {
    const dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function moveCarousel(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    if (!carouselTrack) return;
    
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Auto-play carousel
let carouselInterval;
function startCarouselAutoPlay() {
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000);
}

function stopCarouselAutoPlay() {
    clearInterval(carouselInterval);
}

// ============================================
// CAROUSEL DA GALERIA
// ============================================
let gallerySlide = 0;
let totalGallerySlides = 0;
let galleryAutoPlayInterval;

function initGalleryCarousel() {
    const galleryTrack = document.getElementById('galleryTrack');
    if (!galleryTrack) return;
    
    totalGallerySlides = galleryTrack.children.length;
    const dotsContainer = document.getElementById('galleryDots');
    if (!dotsContainer) return;
    
    for (let i = 0; i < totalGallerySlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToGallerySlide(i));
        dotsContainer.appendChild(dot);
    }
    
    // Adicionar funcionalidade de swipe no mobile
    addGallerySwipeListener();
    
    // Iniciar auto-play
    startGalleryAutoPlay();
}

let touchStartX = 0;
let touchEndX = 0;

function addGallerySwipeListener() {
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (!galleryCarousel) return;
    
    galleryCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopGalleryAutoPlay();
    }, false);
    
    galleryCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGallerySwipe();
        resumeGalleryAutoPlay();
    }, false);
    
    // Pausar ao passar o mouse (desktop)
    galleryCarousel.addEventListener('mouseenter', stopGalleryAutoPlay);
    galleryCarousel.addEventListener('mouseleave', startGalleryAutoPlay);
}

function handleGallerySwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe para esquerda = próximo slide
            moveGallery(1);
        } else {
            // Swipe para direita = slide anterior
            moveGallery(-1);
        }
    }
}

function startGalleryAutoPlay() {
    // Inicia o auto-play com velocidade lenta (4 segundos por slide)
    galleryAutoPlayInterval = setInterval(() => {
        moveGallery(1);
    }, 4000);
}

function stopGalleryAutoPlay() {
    // Para o auto-play
    clearInterval(galleryAutoPlayInterval);
}

function resumeGalleryAutoPlay() {
    // Reinicia o auto-play após 2 segundos de inatividade
    stopGalleryAutoPlay();
    setTimeout(() => {
        startGalleryAutoPlay();
    }, 2000);
}

function moveGallery(direction) {
    gallerySlide += direction;
    if (gallerySlide < 0) gallerySlide = totalGallerySlides - 1;
    // Retorna ao início 3 cliques antes de chegar ao fim
    if (gallerySlide >= totalGallerySlides - 3) gallerySlide = 0;
    updateGallery();
}

function goToGallerySlide(index) {
    gallerySlide = index;
    updateGallery();
}

function updateGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    if (!galleryTrack || totalGallerySlides === 0) return;
    
    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth <= 768;
    
    let gapSize = 27;
    let itemsToShow = 4;
    if (isMobile) {
        itemsToShow = 1;
        gapSize = -20; 
    } else if (isTablet) {
        itemsToShow = 2;
    }
    
    const containerWidth = galleryTrack.parentElement.offsetWidth;
    const itemWidth = (containerWidth / itemsToShow);
    const distancePerSlide = itemWidth + gapSize; 
    const translateDistance = gallerySlide * distancePerSlide;
    
    galleryTrack.style.transform = `translateX(-${translateDistance}px)`;
    
    const dots = document.querySelectorAll('#galleryDots .dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === gallerySlide);
    });
}


function copyPix() {
    const pixKey = 'casamento.aquilaeevelyn@gmail.com';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pixKey).then(() => {
            showNotification('Chave PIX copiada!', 'success');
        }).catch(() => {
            fallbackCopyPix(pixKey);
        });
    } else {
        fallbackCopyPix(pixKey);
    }
}

function fallbackCopyPix(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Chave PIX copiada!', 'success');
    } catch (err) {
        showNotification('Erro ao copiar. Por favor, copie manualmente.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// ============================================
// ACCORDION DE ESTACIONAMENTO
// ============================================
function toggleAccordion(headerButton) {
    const accordionItem = headerButton.parentElement;
    const isActive = accordionItem.classList.contains('active');
    
    // Fechar todos os outros acordeões
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(item => {
        if (item !== accordionItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle o acordeão atual
    accordionItem.classList.toggle('active');
}

// ============================================
// SISTEMA DE NOTIFICAÇÕES
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        backgroundColor: type === 'success' ? 'var(--color-primary)' : 
                        type === 'error' ? '#e74c3c' : 'var(--color-secondary)',
        color: 'white',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--font-size-sm)'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ============================================
// CARRINHO DE COMPRAS
// ============================================
let cart = [];

function addToCart(price, title) {
    cart.push({price: parseFloat(price), title});
    updateCart();
    showNotification(`${title} adicionado ao carrinho!`, 'success');
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `<li>${item.title} - R$ ${item.price.toFixed(2).replace('.', ',')}</li>`).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').textContent = total.toFixed(2).replace('.', ',');
}

function crc16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

function generatePix() {
    if (cart.length === 0) {
        showNotification('Carrinho vazio!', 'error');
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const valor = total.toFixed(2);
    const tam_valor = valor.length.toString().padStart(2, '0');
    const base = `00020126550014BR.GOV.BCB.PIX0133casamento.aquilaeevelyn@gmail.com52040000530398654${tam_valor}${valor}5802BR5901N6001C62070503***6304`;
    const crc = crc16(base);
    const pixCode = base + crc;

    // Copiar para clipboard
    navigator.clipboard.writeText(pixCode).then(() => {
        showNotification('Código PIX copiado!', 'success');
    }).catch(() => {
        showNotification('Erro ao copiar. Código: ' + pixCode, 'error');
    });

    // Gerar QR Code
    const img = document.getElementById('pix-qrcode-img');
    img.style.display = 'none'; // Esconder enquanto carrega
    const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(pixCode);
    img.src = qrUrl;
    img.onload = function() {
        img.style.display = 'block';
    };
    img.onerror = function() {
        showNotification('Erro ao gerar QR Code', 'error');
    };
}

// ============================================
// CAROUSEL DE DEPOIMENTOS
// ============================================
let testimonialsSlide = 0;
let totalTestimonialsSlides = 0;

function moveTestimonials(direction) {
    const isMobile = window.innerWidth <= 768;
    testimonialsSlide += direction;

    if (isMobile) {
        // Mobile: loop completo
        if (testimonialsSlide < 0) testimonialsSlide = totalTestimonialsSlides - 1;
        if (testimonialsSlide >= totalTestimonialsSlides) testimonialsSlide = 0;
    } else {
        // Desktop: loop parcial para mostrar 2 itens
        if (testimonialsSlide < 0) testimonialsSlide = totalTestimonialsSlides - 2;
        if (testimonialsSlide >= totalTestimonialsSlides - 1) testimonialsSlide = 0;
    }

    updateTestimonials();
}

function updateTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    if (!track || totalTestimonialsSlides === 0) return;

    const isMobile = window.innerWidth <= 768;
    let itemsToShow = isMobile ? 1 : 2;
    let gapSize = 30; // match gap in CSS

    const container = track.parentElement;
    const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft);
    const paddingRight = parseFloat(getComputedStyle(container).paddingRight);
    const containerWidth = container.offsetWidth - paddingLeft - paddingRight;

    const itemWidth = (containerWidth - gapSize * (itemsToShow - 1)) / itemsToShow;
    const distancePerSlide = itemWidth + gapSize;
    const translateDistance = testimonialsSlide * distancePerSlide;

    track.style.transform = `translateX(-${translateDistance}px)`;
}

// ============================================
// SWIPE PARA CAROUSEL DE DEPOIMENTOS
// ============================================
let testimonialsTouchStartX = 0;
let testimonialsTouchEndX = 0;

function addTestimonialsSwipeListener() {
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    if (!testimonialsCarousel) return;

    testimonialsCarousel.addEventListener('touchstart', (e) => {
        testimonialsTouchStartX = e.changedTouches[0].screenX;
    }, false);

    testimonialsCarousel.addEventListener('touchend', (e) => {
        testimonialsTouchEndX = e.changedTouches[0].screenX;
        handleTestimonialsSwipe();
    }, false);
}

function handleTestimonialsSwipe() {
    const swipeThreshold = 50;
    const diff = testimonialsTouchStartX - testimonialsTouchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe para esquerda = próximo slide
            moveTestimonials(1);
        } else {
            // Swipe para direita = slide anterior
            moveTestimonials(-1);
        }
    }
}

// ============================================
// API DE DEPOIMENTOS
// ============================================
async function fetchTestimonials() {
    const trackContainer = document.getElementById('testimonialsTrack');

    try {
        const response = await fetch('./testimonials.json');
        const testimonials = await response.json();

        if (testimonials.length === 0) {
            trackContainer.innerHTML = `
                <div class="testimonials-empty">
                    <p>Aguardando depoimentos... 💕</p>
                </div>
            `;
            return;
        }

        trackContainer.innerHTML = testimonials.map(t => createTestimonialCard(t)).join('');
        totalTestimonialsSlides = testimonials.length;

    } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
        trackContainer.innerHTML = `
            <div class="testimonials-empty">
                <p>Não foi possível carregar os depoimentos no momento.</p>
            </div>
        `;
    }
}

function createTestimonialCard(testimonial) {
    const date = new Date(testimonial.created_at);
    const formattedDate = date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    });
    
    const initial = testimonial.autor.charAt(0).toUpperCase();
    
    return `
        <div class="testimonial-card">
            <div class="testimonial-header">
                <div class="testimonial-avatar">${initial}</div>
                <div class="testimonial-author">
                    <div class="testimonial-name">${escapeHtml(testimonial.autor)}</div>
                    <div class="testimonial-date">${formattedDate}</div>
                </div>
            </div>
            <p class="testimonial-message">${escapeHtml(testimonial.mensagem)}</p>
        </div>
    `;
}



// ============================================
// UTILITÁRIOS
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// ANIMAÇÕES DE SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.info-card, .gallery-item, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
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

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const target = document.querySelector('.story-section');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // CTA primary button scroll to RSVP
    const ctaPrimary = document.querySelector('.cta-primary');
    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('.rsvp-section');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Carousel
    initCarousel();
    startCarouselAutoPlay();
    
    // Gallery Carousel
    initGalleryCarousel();
    updateGallery();
    
    // Pausar auto-play ao interagir
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarouselAutoPlay);
        carousel.addEventListener('mouseleave', startCarouselAutoPlay);
    }
    
    // Carrinho
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            addToCart(btn.dataset.price, btn.dataset.title);
        });
    });
    document.getElementById('generate-pix').addEventListener('click', generatePix);
    
    // Carregar depoimentos
    fetchTestimonials();
    addTestimonialsSwipeListener();

    // Animações
    initScrollAnimations();
    initSmoothScroll();
    
    console.log('Site de casamento inicializado! ');
});

// ============================================
// ANIMAÇÕES CSS ADICIONAIS (injetadas via JS)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);