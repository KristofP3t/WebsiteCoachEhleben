// ============================================================
// NAVIGATION – Mobile Toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
    });
});

// ============================================================
// NAVIGATION – Scroll shadow
// ============================================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ============================================================
// FAQ – Accordion
// ============================================================
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');
    btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all open items
        faqItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        });

        // Open the clicked item unless it was already open
        if (!isActive) {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});
