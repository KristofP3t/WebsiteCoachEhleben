// ============================================================
// NAVIGATION – Mobile Toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navToggle && navMenu) {
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
}

// ============================================================
// NAVIGATION – Scroll shadow
// ============================================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ============================================================
// NAVIGATION – Dropdown
// ============================================================
document.querySelectorAll('.nav__item--dropdown').forEach(item => {
    const trigger = item.querySelector('.nav__dropdown-trigger');
    if (!trigger) return;

    // Desktop: open/close on click (toggle), hover handled by CSS
    trigger.addEventListener('click', (e) => {
        // On mobile the menu is a flex column – always toggle on click
        if (window.innerWidth <= 640) {
            e.preventDefault();
            item.classList.toggle('open');
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!item.contains(e.target)) {
            item.classList.remove('open');
        }
    });

    // Keyboard: close on Escape
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') item.classList.remove('open');
    });
});

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
