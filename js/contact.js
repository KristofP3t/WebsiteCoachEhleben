// ============================================================
// CONTACT FORM – Validation & Submission
// ============================================================
(function () {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');

    if (!form) return;

    const rules = {
        vorname:    { required: true, label: 'Vorname' },
        nachname:   { required: true, label: 'Nachname' },
        email:      { required: true, label: 'E-Mail-Adresse', type: 'email' },
        thema:      { required: true, label: 'Thema' },
        nachricht:  { required: true, label: 'Nachricht' },
        datenschutz: { required: true, label: 'Datenschutz', type: 'checkbox' },
    };

    function validateField(name, value, checked) {
        const rule = rules[name];
        if (!rule) return '';

        if (rule.required) {
            if (rule.type === 'checkbox' && !checked) {
                return 'Bitte stimmen Sie der Datenschutzerklärung zu.';
            }
            if (rule.type !== 'checkbox' && !value.trim()) {
                return `Bitte füllen Sie das Feld "${rule.label}" aus.`;
            }
        }

        if (rule.type === 'email' && value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value.trim())) {
                return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
            }
        }

        return '';
    }

    function showError(name, message) {
        const input = form.elements[name];
        const errorEl = document.getElementById(name + '-error');
        if (!input || !errorEl) return;

        errorEl.textContent = message;
        if (input.type === 'checkbox') {
            input.closest('.contact-form__group').classList.toggle('contact-form__group--error', !!message);
        } else {
            input.classList.toggle('contact-form__input--error', !!message);
            input.setAttribute('aria-invalid', message ? 'true' : 'false');
        }
    }

    // Live validation on blur
    Object.keys(rules).forEach(name => {
        const input = form.elements[name];
        if (!input) return;
        input.addEventListener('blur', () => {
            const error = validateField(name, input.value, input.checked);
            showError(name, error);
        });
        // Clear error on input
        input.addEventListener('input', () => {
            if (input.classList.contains('contact-form__input--error') ||
                input.closest('.contact-form__group')?.classList.contains('contact-form__group--error')) {
                showError(name, '');
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;
        let firstInvalidField = null;

        Object.keys(rules).forEach(name => {
            const input = form.elements[name];
            if (!input) return;
            const error = validateField(name, input.value, input.checked);
            showError(name, error);
            if (error && !firstInvalidField) {
                firstInvalidField = input;
            }
            if (error) isValid = false;
        });

        if (!isValid) {
            firstInvalidField?.focus();
            return;
        }

        const submitBtn = form.querySelector('.contact-form__submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet …';

        try {
            const data = new FormData(form);
            const endpoint = form.action;

            // If no real endpoint is configured, simulate success in development
            if (!endpoint || endpoint.includes('[FORM-ENDPOINT]')) {
                await new Promise(resolve => setTimeout(resolve, 800));
                showSuccess();
                return;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                showSuccess();
            } else {
                throw new Error('Serverfehler');
            }
        } catch {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Nachricht senden';
            alert('Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie direkt an kontakt@marvinehleben.de');
        }
    });

    function showSuccess() {
        form.hidden = true;
        success.hidden = false;
        success.focus();
    }
})();
