// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================================
    // Animación de aparición de secciones y posts al hacer scroll
    // Ahora incluye '.post-item' para animar las tarjetas del índice.
    // ===================================================
    const sectionsAndPosts = document.querySelectorAll('.section, .post-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez que es visible
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    sectionsAndPosts.forEach(element => {
        observer.observe(element);
    });
    
    // ===================================================
    // Smooth scroll para los enlaces del menú
    // Permite navegar a secciones internas (#) y a otras páginas (posts.html)
    // ===================================================
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
            
            // Solo aplicar smooth scroll si el enlace es a una sección interna (#)
            if (targetHref.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetHref);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================================
    // Botón de scroll to top
    // ===================================================
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.innerHTML = '&#9650;'; // Flecha hacia arriba
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===================================================
    // Efecto de escritura para el título (Solo se activa si existe un h1 adecuado)
    // ===================================================
    const titleElement = document.getElementById('typewriter-title') || document.querySelector('.profile-info h1');
    
    // Esta lógica revisa si el título tiene un texto que valga la pena animar 
    // y no está en la página de posts, donde el título es estático.
    if (titleElement && titleElement.textContent.length > 0 && titleElement.textContent !== "CryptoPulse") {
        const originalTitle = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalTitle.length) {
                titleElement.textContent += originalTitle.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    // ===================================================
    // Animación de las tarjetas de tecnología
    // ===================================================
    const techBadges = document.querySelectorAll('.crypto-badge');
    
    techBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    // ===================================================
    // Efecto de parallax en imágenes
    // ===================================================
    const contentImages = document.querySelectorAll('.content-image');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        contentImages.forEach(image => {
            const speed = 0.5;
            const yPos = -(scrollPosition * speed);
            image.style.transform = `translateY(${yPos}px) scale(1.03)`;
        });
    });
    
    // ===================================================
    // Contador de visitas simple
    // ===================================================
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    console.log(`Visitas a la página: ${visitCount}`);
});
