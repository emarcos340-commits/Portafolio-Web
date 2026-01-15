/**
 * SISTEMA DE NAVEGACIÓN RETRO
 * Maneja el menú móvil lateral y la navegación activa
 */

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Cerrar menú al hacer clic en el overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function () {
            closeMenu();
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Función para abrir/cerrar menú
    function toggleMenu() {
        navMenu.classList.toggle('active');
        if (menuOverlay) {
            menuOverlay.classList.toggle('active');
        }

        // Cambiar ícono del botón
        if (navMenu.classList.contains('active')) {
            menuToggle.textContent = '✕';
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        } else {
            menuToggle.textContent = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Restaurar scroll
        }
    }

    // Función para cerrar menú
    function closeMenu() {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        if (menuToggle) {
            menuToggle.textContent = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }

    // Marcar página actual como activa
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de resize - cerrar menú si se agranda la pantalla
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 767) {
                closeMenu();
            }
        }, 250);
    });

    console.log('>>> NAVEGACIÓN_INICIALIZADA <<<');
});
