
//----------- Menu burger : Ouvrir ou fermer le menu navigation-------------------
const burger = document.querySelector('.burger'); // Sélectionne l'icône burger
const nav = document.querySelector('.headernav'); // Sélectionne la barre de navigation

//------------------ Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    const isActive = nav.classList.toggle('active'); // Ajoute/retire la classe 'active'
    burger.classList.toggle('open'); // Animation du burger
    burger.setAttribute('aria-expanded', isActive); // Met à jour l'état aria-expanded
}

//---------------- Fonction pour fermer le menu lorsqu'on clique en dehors
function closeMenu(event) {
    if (!nav.contains(event.target) && !burger.contains(event.target)) {
        nav.classList.remove('active');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false); // Réinitialise l'état aria-expanded
    }
}

//ouvrir/fermer le menu
burger.addEventListener('click', toggleMenu);

// Événement pour fermer le menu en cliquant à l'extérieur
document.addEventListener('click', closeMenu);

// Ferme le menu si la taille d'écran dépasse 768px
const mediaQuery = window.matchMedia('(min-width: 768px)');
mediaQuery.addEventListener('change', () => {
    if (mediaQuery.matches) {
        nav.classList.remove('active');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
    }
});

//---------------------- cookies
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("cookiesAccepted") && !localStorage.getItem("cookiesRefused")) {
        document.getElementById("cookie-banner").style.display = "flex";
    }
});

function acceptCookies() {
    localStorage.setItem("cookiesAccepted", true);
    document.getElementById("cookie-banner").style.display = "none";
}

function refuseCookies() {
    localStorage.setItem("cookiesRefused", true);
    document.getElementById("cookie-banner").style.display = "none";
}

//---------------------faq
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item h3");

    faqItems.forEach(item => {
        item.addEventListener("click", () => {
            const parent = item.parentElement;
            parent.classList.toggle("active");
        });
    });
});

// ---------------------- Formulaire  Validation ----------------------
const form = document.querySelector('.formulaire form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    clearErrors();

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Veuillez entrer votre nom.');
        isValid = false;
    }

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Veuillez entrer un email valide.');
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Veuillez entrer votre message.');
        isValid = false;
    }

    if (isValid) {
        formMessage.textContent = 'Votre message a été envoyé avec succès!';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');
        formMessage.style.display = 'block';
        form.reset();
    } else {
        formMessage.textContent = 'Veuillez corriger les erreurs ci-dessus.';
        formMessage.classList.add('error');
        formMessage.classList.remove('success');
        formMessage.style.display = 'block';
    }
});

function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(span => {
        span.textContent = '';
        span.style.display = 'none';
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// ----------------------  ----------------------
