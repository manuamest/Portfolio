document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const themeDark = document.getElementById('theme-dark');
    const themeLight = document.getElementById('theme-light');

    const setTheme = (theme) => {
        body.classList.toggle('dark-theme', theme === 'dark');
        body.classList.toggle('light-theme', theme === 'light');
        themeDark?.classList.toggle('active', theme === 'dark');
        themeLight?.classList.toggle('active', theme === 'light');
        localStorage.setItem('portfolio-theme', theme);
        configureParticles();
    };

    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemTheme = window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(savedTheme || systemTheme);

    themeDark?.addEventListener('click', () => setTheme('dark'));
    themeLight?.addEventListener('click', () => setTheme('light'));

    if (header && nav) {
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-nav-toggle';
        mobileMenuToggle.type = 'button';
        mobileMenuToggle.setAttribute('aria-label', 'Open menu');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        header.querySelector('.container')?.insertBefore(mobileMenuToggle, nav);

        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = header.classList.toggle('mobile-menu-active');
            mobileMenuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        window.requestAnimationFrame(() => {
            header?.classList.toggle('scrolled', window.scrollY > 50);
            ticking = false;
        });
        ticking = true;
    }, { passive: true });

    let cursorTicking = false;
    window.addEventListener('mousemove', (event) => {
        if (cursorTicking) return;
        window.requestAnimationFrame(() => {
            body.style.setProperty('--x-position', `${(event.clientX / window.innerWidth) * 100}%`);
            body.style.setProperty('--y-position', `${(event.clientY / window.innerHeight) * 100}%`);
            cursorTicking = false;
        });
        cursorTicking = true;
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            header?.classList.remove('mobile-menu-active');
            const toggle = document.querySelector('.mobile-nav-toggle');
            if (toggle) toggle.innerHTML = '<i class="fas fa-bars"></i>';

            const headerHeight = header?.offsetHeight || 0;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 20,
                behavior: 'smooth'
            });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('section').forEach((section) => {
        section.classList.add('hidden');
        observer.observe(section);
    });
    document.querySelector('.hero')?.classList.add('show');

    document.querySelectorAll('#experience .container, #about-me .container').forEach((container) => {
        const neuralLine = document.createElement('div');
        neuralLine.className = 'neural-line';

        for (let i = 0; i < 5; i++) {
            const neuralDot = document.createElement('div');
            neuralDot.className = 'neural-dot';
            neuralDot.style.animationDelay = `${i * 0.5}s`;
            neuralLine.appendChild(neuralDot);
        }

        container.appendChild(neuralLine);
    });

    calculateExperienceMonths();
});

function configureParticles() {
    if (!window.particlesJS || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    if (window.pJSDom?.length) {
        window.pJSDom.forEach((particleInstance) => particleInstance.pJS.fn.vendors.destroypJS());
        window.pJSDom = [];
    }

    const container = document.getElementById('particles-js');
    if (container) container.innerHTML = '';

    const isDarkTheme = document.body.classList.contains('dark-theme');
    const darkThemeConfig = {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: ['#ffffff', '#78a9f7', '#4f85e5', '#a9d0ff'] },
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
            opacity: { value: 0.8, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 1, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: '#4f85e5', opacity: 0.25, width: 1 },
            move: {
                enable: true,
                speed: 0.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.8 } },
                bubble: { distance: 400, size: 4, duration: 2, opacity: 0.8, speed: 3 },
                push: { particles_nb: 3 }
            }
        },
        retina_detect: true
    };

    const lightThemeConfig = {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#1e3d59', '#2c5282', '#3498db'] },
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
            opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: '#1e3d59', opacity: 0.3, width: 1 },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    };

    window.particlesJS('particles-js', isDarkTheme ? darkThemeConfig : lightThemeConfig);
}

function calculateExperienceMonths() {
    const experienceCounter = document.querySelector('.experience-counter');
    if (!experienceCounter) return;

    const startDate = new Date(2024, 6, 1);
    const currentDate = new Date();
    const diffMonths = Math.max(0, (currentDate.getFullYear() - startDate.getFullYear()) * 12 + currentDate.getMonth() - startDate.getMonth());
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    const parts = [];

    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (months > 0 || years === 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);

    experienceCounter.textContent = parts.join(' ');
}
