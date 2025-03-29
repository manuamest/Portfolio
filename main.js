// Inicialización de partículas
document.addEventListener('DOMContentLoaded', function() {
    // Configuración distinta para cada tema
    const configureParticles = () => {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        
        // Configuración para tema nocturno (constelaciones)
        const darkThemeConfig = {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#ffffff", "#78a9f7", "#4f85e5", "#a9d0ff"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.8,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4f85e5",
                    "opacity": 0.25,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 4,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "push": {
                        "particles_nb": 3
                    }
                }
            },
            "retina_detect": true
        };
        
        // Configuración para tema claro
        const lightThemeConfig = {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#1e3d59", "#2c5282", "#3498db"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.4,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#1e3d59",
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        };
        
        // Aplicar configuración según el tema
        particlesJS('particles-js', isDarkTheme ? darkThemeConfig : lightThemeConfig);
    };
    
    // Configurar partículas iniciales
    configureParticles();
    
    // Reconfigurar cuando cambie el tema
    const themeDark = document.getElementById('theme-dark');
    const themeLight = document.getElementById('theme-light');
    
    if (themeDark) {
        themeDark.addEventListener('click', function() {
            setTimeout(configureParticles, 100); // Dar tiempo para que cambie la clase del tema
        });
    }
    
    if (themeLight) {
        themeLight.addEventListener('click', function() {
            setTimeout(configureParticles, 100); // Dar tiempo para que cambie la clase del tema
        });
    }
});

// Menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-nav-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (header && nav) {
        header.querySelector('.container').insertBefore(mobileMenuToggle, nav);
        
        mobileMenuToggle.addEventListener('click', function() {
            header.classList.toggle('mobile-menu-active');
            
            if (header.classList.contains('mobile-menu-active')) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
});

// Efecto de header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Efecto de desplazamiento suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Cerrar menú móvil si está abierto
            const header = document.querySelector('header');
            if (header) {
                header.classList.remove('mobile-menu-active');
                const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
                if (mobileMenuToggle) {
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
            
            const headerHeight = header ? header.offsetHeight : 0;
            window.scrollTo({
                top: target.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de aparición al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Observar secciones para animarlas al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
    
    // Añadir clase para la animación de entrada inicial
    setTimeout(() => {
        document.querySelector('.hero').classList.add('show');
    }, 100);
    
    // Crear líneas neuronales para el tema de IA y visión por computador
    createNeuralLines();
});

// Añadir CSS dinámicamente para las animaciones de entrada
const style = document.createElement('style');
style.textContent = `
.hidden {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.show {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(style);

// Función para crear líneas neuronales dinámicas (simulando conexiones neuronales de IA)
function createNeuralLines() {
    // Crear líneas neuronales en secciones específicas
    const sections = document.querySelectorAll('#experience, #about-me');
    
    sections.forEach(section => {
        const neuralLine = document.createElement('div');
        neuralLine.className = 'neural-line';
        
        // Añadir puntos neuronales (simulando nodos de una red neuronal)
        for (let i = 0; i < 5; i++) {
            const neuralDot = document.createElement('div');
            neuralDot.className = 'neural-dot';
            neuralDot.style.animationDelay = `${i * 0.5}s`;
            neuralLine.appendChild(neuralDot);
        }
        
        section.querySelector('.container').appendChild(neuralLine);
    });
}

// Efecto de escritura para la descripción del héroe
document.addEventListener('DOMContentLoaded', function() {
    const heroDescription = document.querySelector('.hero p');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        heroDescription.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroDescription.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Manejar el envío del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se implementaría el envío del formulario
            // Por ahora, solo mostraremos un mensaje de éxito
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.display = 'none';
            });
            
            const submitButton = document.querySelector('.contact-form button');
            submitButton.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message sent!</h3>
                <p>Thank you for contacting me. I'll respond as soon as possible.</p>
            `;
            
            document.querySelector('.contact-form').appendChild(successMessage);
            
            // Añadir estilo para el mensaje de éxito
            const successStyle = document.createElement('style');
            successStyle.textContent = `
                .success-message {
                    text-align: center;
                    padding: 30px 20px;
                    animation: fadeIn 0.6s ease;
                }
                .success-message i {
                    font-size: 3rem;
                    color: #4f85e5;
                    margin-bottom: 20px;
                }
                .success-message h3 {
                    margin-bottom: 15px;
                }
            `;
            document.head.appendChild(successStyle);
        });
    }
});

// Cambio de tema
document.addEventListener('DOMContentLoaded', function() {
    const themeDark = document.getElementById('theme-dark');
    const themeLight = document.getElementById('theme-light');
    
    // Verificar tema guardado
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.body.className = savedTheme + '-theme';
        updateActiveThemeButton(savedTheme);
    }
    
    // Alternar al tema oscuro
    if (themeDark) {
        themeDark.addEventListener('click', function() {
            document.body.className = 'dark-theme';
            localStorage.setItem('portfolio-theme', 'dark');
            updateActiveThemeButton('dark');
        });
    }
    
    // Alternar al tema claro
    if (themeLight) {
        themeLight.addEventListener('click', function() {
            document.body.className = 'light-theme';
            localStorage.setItem('portfolio-theme', 'light');
            updateActiveThemeButton('light');
        });
    }
    
    // Actualizar botones activos
    function updateActiveThemeButton(theme) {
        if (themeDark && themeLight) {
            themeDark.classList.toggle('active', theme === 'dark');
            themeLight.classList.toggle('active', theme === 'light');
        }
    }
    
    // Calcular meses de experiencia
    calculateExperienceMonths();
});

// Calcular meses de experiencia
function calculateExperienceMonths() {
    const experienceCounter = document.querySelector('.experience-counter');
    if (!experienceCounter) return;
    
    const startDate = new Date(2024, 6, 1); // Julio 1, 2024 (meses en JS son 0-indexed)
    const currentDate = new Date();
    
    // Calcular diferencia en milisegundos
    const diffTime = Math.abs(currentDate - startDate);
    
    // Calcular meses completos
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    
    // Calcular años y meses
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    
    // Construir texto según la duración
    let experienceText = '';
    if (years > 0) {
        experienceText += years + (years === 1 ? ' year ' : ' years ');
    }
    if (months > 0 || years === 0) {
        experienceText += months + (months === 1 ? ' month' : ' months');
    }
    
    // Actualizar contador
    experienceCounter.textContent = experienceText;
}

// Detectar el tema del sistema y adaptar algunos colores para mejor visibilidad
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    // Si no hay tema guardado, aplicar el tema del sistema
    if (!localStorage.getItem('portfolio-theme')) {
        document.body.className = 'light-theme';
        // Si existen los botones, actualizar el activo
        const themeLight = document.getElementById('theme-light');
        const themeDark = document.getElementById('theme-dark');
        if (themeLight && themeDark) {
            themeLight.classList.add('active');
            themeDark.classList.remove('active');
        }
    }
}

// Añadir efectos de seguimiento de cursor para elementos interactivos
document.addEventListener('mousemove', function(e) {
    const cursor = e.clientX;
    const width = window.innerWidth;
    
    // Crear un efecto sutil de seguimiento de cursor para el fondo
    document.body.style.setProperty('--x-position', `${cursor / width * 100}%`);
});

// Añadir CSS para el efecto de seguimiento de cursor
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    body::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at var(--x-position, 50%) 50%, rgba(79, 133, 229, 0.2), transparent 50%);
        pointer-events: none;
        z-index: -1;
        opacity: 0.8;
    }
`;
document.head.appendChild(cursorStyle); 