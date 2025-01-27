// Menu burger : Ouvrir ou fermer le menu navigation

// Menu burger : Ouvrir ou fermer le menu navigation
const burger = document.querySelector('.burger'); // Sélectionne l'icône burger
const nav = document.querySelector('.headernav'); // Sélectionne la barre de navigation

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    const isActive = nav.classList.toggle('active'); // Ajoute/retire la classe 'active'
    burger.classList.toggle('open'); // Animation du burger
    burger.setAttribute('aria-expanded', isActive); // Met à jour l'état aria-expanded
}

// Fonction pour fermer le menu lorsqu'on clique en dehors
function closeMenu(event) {
    if (!nav.contains(event.target) && !burger.contains(event.target)) {
        nav.classList.remove('active');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false); // Réinitialise l'état aria-expanded
    }
}

// Événement pour ouvrir/fermer le menu
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