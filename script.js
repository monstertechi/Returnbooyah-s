document.addEventListener('DOMContentLoaded', function() {

    // --- Tagde Tagde Animations (Scroll Reveal) ---
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1500, // Thoda fast animation
        delay: 200,
        reset: true // === YEH HAI MAIN CHANGE, ANIMATION HAR BAAR HOGA ===
    });

    // Reveal calls for all sections
    sr.reveal('.hero-content', { interval: 200 });
    sr.reveal('.phone-mockup', {});
    sr.reveal('.section-title, .section-subtitle', {});
    sr.reveal('.feature-card', { interval: 200, origin: 'top' });
    sr.reveal('.feature-list-item', { interval: 100, origin: 'left' });
    sr.reveal('.stat-item .stat-icon, .stat-item .stat-label', { interval: 100 });
    sr.reveal('.testimonial-content, .slider-dots', {});
    sr.reveal('.download-section h2, .download-section p, .btn-download', { interval: 200 });

    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.mobile-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // --- Number Counting Animation ---
    const counters = document.querySelectorAll('.stat-number');

    // Use Intersection Observer to trigger counter only when it's in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const startValue = parseInt(counter.dataset.startValue) || 0; // Use a data attribute to store start value if needed
                const target = parseInt(counter.dataset.target);
                
                // Reset text to initial value before starting animation
                counter.innerText = counter.dataset.initialText || '0';

                let current = parseInt(counter.innerText);
                const duration = 2000;
                const stepTime = 15;
                const totalSteps = duration / stepTime;
                const increment = (target - current) / totalSteps;

                const updateCount = () => {
                    current += increment;
                    if ((increment > 0 && current < target) || (increment < 0 && current > target)) {
                        counter.innerText = Math.ceil(current);
                        setTimeout(updateCount, stepTime);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                
                // Unobserve after animating to avoid re-triggering constantly while visible
                // Re-observation will happen automatically by ScrollReveal's reset:true nature
                // Note: The logic for re-triggering number animation on scroll up is complex
                // with just this. The reveal animation will re-trigger, but number counting needs
                // a more robust state management. This setup ensures it runs at least once per scroll-down.
            }
        });
    }, {
        threshold: 0.7
    });
    
    // Store initial text and observe each counter
    counters.forEach(counter => {
        counter.dataset.initialText = counter.innerText;
        observer.observe(counter);
    });
});