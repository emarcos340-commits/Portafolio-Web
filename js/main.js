// ============================================
// EFECTOS RETRO Y ANIMACIONES
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar efectos
    initAnimations();
    initProgressBars();
    initFormHandling();
    initGlitchEffect();
    initTypingEffect();
});

// ============================================
// ANIMACIONES DE ENTRADA
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos con animaciones
    const animatedElements = document.querySelectorAll('.animate-slideUp, .animate-slideLeft, .animate-slideRight, .animate-zoomIn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// BARRAS DE PROGRESO ANIMADAS
// ============================================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;

                // Resetear ancho
                progressBar.style.width = '0%';

                // Animar al ancho objetivo
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);

                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => observer.observe(bar));
}

// ============================================
// MANEJO DEL FORMULARIO DE CONTACTO
// ============================================
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simular envío (en producción, aquí iría la lógica de envío real)
            const formMessage = document.getElementById('formMessage');
            formMessage.style.display = 'block';
            formMessage.innerHTML = `
                <p style="margin: 0; color: var(--color-secondary);">
                    &gt; MENSAJE_ENVIADO.SUCCESS<br>
                    &gt; GRACIAS ${name.toUpperCase()}, TE CONTACTARÉ PRONTO
                </p>
            `;

            // Limpiar formulario
            contactForm.reset();

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });

        // Efectos de focus en inputs
        const inputs = contactForm.querySelectorAll('.retro-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.style.borderColor = 'var(--color-secondary)';
            });

            input.addEventListener('blur', function () {
                this.style.borderColor = 'var(--color-primary)';
            });
        });
    }
}

// ============================================
// EFECTO GLITCH ALEATORIO
// ============================================
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-text');

    glitchElements.forEach(element => {
        setInterval(() => {
            // Aplicar glitch aleatorio
            if (Math.random() > 0.95) {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'glitch 0.3s infinite';
                    setTimeout(() => {
                        element.style.animation = 'glitch 5s infinite';
                    }, 300);
                }, 10);
            }
        }, 3000);
    });
}

// ============================================
// EFECTO DE ESCRITURA EN TERMINAL
// ============================================
function initTypingEffect() {
    const terminalElements = document.querySelectorAll('.terminal-text');

    terminalElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    });
}

// ============================================
// EFECTOS DE HOVER EN CARDS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Selectores para todos los elementos que deben tener sonido
    const cards = document.querySelectorAll('.card, .project-card, .contact-info-item, .social-link, .btn');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Efecto de sonido (opcional)
            playHoverSound();
        });
    });
});

// ============================================
// SONIDO DE HOVER (OPCIONAL)
// ============================================
function playHoverSound() {
    // Crear un beep corto usando Web Audio API
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    }
}

// ============================================
// PARTÍCULAS FLOTANTES (OPCIONAL)
// ============================================
function createParticles() {
    const particleCount = 20;
    const container = document.body;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';

        container.appendChild(particle);
    }
}

// Descomentar para activar partículas
// createParticles();

// ============================================
// EASTER EGG: CÓDIGO KONAMI
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Cambiar colores temporalmente
    document.documentElement.style.setProperty('--color-primary', '#ff00ff');
    document.documentElement.style.setProperty('--color-secondary', '#00ffff');

    alert('🎮 ¡CÓDIGO KONAMI ACTIVADO! 🎮\n\n>>> MODO_RETRO_EXTREMO <<<');

    // Restaurar colores después de 10 segundos
    setTimeout(() => {
        document.documentElement.style.setProperty('--color-primary', '#3CB043');
        document.documentElement.style.setProperty('--color-secondary', '#0CE25E');
    }, 10000);
}

// ============================================
// CONSOLA RETRO
// ============================================
console.log('%c>>> SISTEMA_INICIADO <<<', 'color: #3CB043; font-size: 20px; font-family: monospace;');
console.log('%c> PORTAFOLIO_RETRO v1.0', 'color: #0CE25E; font-size: 14px; font-family: monospace;');
console.log('%c> DESARROLLADO_CON: HTML, CSS, JavaScript', 'color: #31D633; font-size: 12px; font-family: monospace;');
console.log('%c> ESTADO: ONLINE', 'color: #2EDC8B; font-size: 12px; font-family: monospace;');
console.log('%c> TIP: Prueba el código Konami ;)', 'color: #33CC99; font-size: 10px; font-family: monospace;');
