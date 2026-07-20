document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const header = document.querySelector('header');
    const navigation = document.getElementById('main-navigation');
    const menuToggle = document.querySelector('.mobile-nav-toggle');
    const themeDark = document.getElementById('theme-dark');
    const themeLight = document.getElementById('theme-light');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const getSavedTheme = () => {
        try {
            return localStorage.getItem('portfolio-theme');
        } catch {
            return null;
        }
    };

    const saveTheme = (theme) => {
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch {
            // The selected theme still applies when storage is unavailable.
        }
    };

    const setTheme = (theme, persist = true) => {
        const isDark = theme !== 'light';
        body.classList.toggle('dark-theme', isDark);
        body.classList.toggle('light-theme', !isDark);
        themeDark?.setAttribute('aria-pressed', String(isDark));
        themeLight?.setAttribute('aria-pressed', String(!isDark));
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#020812' : '#f4f7fb');
        if (persist) saveTheme(isDark ? 'dark' : 'light');
    };

    setTheme(getSavedTheme() || 'dark', false);
    themeDark?.addEventListener('click', () => setTheme('dark'));
    themeLight?.addEventListener('click', () => setTheme('light'));

    const setMenuState = (open) => {
        header?.classList.toggle('mobile-menu-active', open);
        menuToggle?.setAttribute('aria-expanded', String(open));
        menuToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        if (menuToggle) {
            menuToggle.innerHTML = `<i class="fas fa-${open ? 'times' : 'bars'}" aria-hidden="true"></i>`;
        }
    };

    menuToggle?.addEventListener('click', () => {
        setMenuState(!header?.classList.contains('mobile-menu-active'));
    });

    navigation?.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && header?.classList.contains('mobile-menu-active')) {
            setMenuState(false);
            menuToggle?.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (header?.classList.contains('mobile-menu-active') && !header.contains(event.target)) {
            setMenuState(false);
        }
    });

    window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
        if (event.matches) setMenuState(false);
    });

    let scrollTicking = false;
    const updateHeader = () => {
        header?.classList.toggle('scrolled', window.scrollY > 24);
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(updateHeader);
    }, { passive: true });
    updateHeader();

    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
        body.classList.add('animations-ready');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
        revealElements.forEach((element) => revealObserver.observe(element));
    }

    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('#main-navigation a[href^="#"]');
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: '-35% 0px -55%', threshold: 0 });
        sections.forEach((section) => sectionObserver.observe(section));
    }

    calculateExperience();
    const currentYear = document.getElementById('current-year');
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());

    reducedMotion.addEventListener('change', (event) => {
        if (event.matches) body.classList.remove('animations-ready');
    });
});

function calculateExperience() {
    const experienceCounter = document.querySelector('.experience-counter');
    if (!experienceCounter) return;

    const startDate = new Date(2024, 6, 1);
    const currentDate = new Date();
    const totalMonths = Math.max(0, (currentDate.getFullYear() - startDate.getFullYear()) * 12 + currentDate.getMonth() - startDate.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts = [];

    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (months > 0 || years === 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    experienceCounter.textContent = parts.join(' ');
}
