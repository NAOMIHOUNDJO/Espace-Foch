document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.headernav');

    burger.addEventListener('click', function () {
        nav.classList.toggle('active');
        burger.classList.toggle('open');
    });
});


//---------------------------------cookies------------------------ 
document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.getElementById("cookie-banner");
    const cookiePreferences = document.getElementById("cookie-preferences");

    // Afficher le bandeau au chargement
    cookieBanner.style.display = "flex"; 

    // Accepter tous les cookies
    document.getElementById("accept-cookies").addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true");
        localStorage.setItem("analyticsCookies", "true");
        localStorage.setItem("advertisingCookies", "true");
        cookieBanner.style.display = "none";
    });

    // Refuser tous les cookies
    document.getElementById("refuse-cookies").addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "false");
        localStorage.setItem("analyticsCookies", "false");
        localStorage.setItem("advertisingCookies", "false");
        cookieBanner.style.display = "none";
    });

    // Ouvrir les préférences
    document.getElementById("modify-preferences").addEventListener("click", () => {
        cookiePreferences.style.display = "block";
    });

    // Fermer les préférences
    document.getElementById("close-preferences").addEventListener("click", () => {
        cookiePreferences.style.display = "none";
    });

    // Sauvegarder les préférences
    document.getElementById("save-preferences").addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true");
        localStorage.setItem("analyticsCookies", document.getElementById("analyticsCookies").checked);
        localStorage.setItem("advertisingCookies", document.getElementById("advertisingCookies").checked);
        cookieBanner.style.display = "none";
        cookiePreferences.style.display = "none";
    });
});



//-----------------------------------faq------------------------ 
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item h3");

    faqItems.forEach(item => {
        item.addEventListener("click", () => {
            const parent = item.parentElement;
            parent.classList.toggle("active");
        });
    });
});

//-----------------------------------ajax------ 
document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/json/data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des données JSON");
        }
        return response.json();
    })
    .then(data => {
        const salon = data.salon_info;
        const salonAccesContainer = document.getElementById("salon-acces");
        const horairesPaiementContainer = document.getElementById("horaires-paiement");

        // Colonne 1 : Salon et Accès
        salonAccesContainer.innerHTML = `
            <h3>${salon.nom}</h3>
            <p><strong>Adresse :</strong> ${salon.adresse}</p>
            <p><strong>Téléphone :</strong> <a href="tel:${salon.telephone}">${salon.telephone}</a></p>
            <p><strong>Email :</strong> <a href="mailto:${salon.email}">${salon.email}</a></p>

            <h3>Accès</h3>
            <p><strong>Transports en commun :</strong></p>
            <ul>
                ${salon.acces.transport_en_commun.map(t => `<li>${t.moyen} - Ligne ${t.ligne} (Station : ${t.station})</li>`).join('')}
            </ul>
            <p><strong>Parkings à proximité :</strong></p>
            <ul>
                ${salon.acces.parking.map(p => `<li>${p.nom} (${p.distance})</li>`).join('')}
            </ul>
        `;

        // Colonne 2 : Horaires et Moyens de paiement
        horairesPaiementContainer.innerHTML = `
            <h3>Horaires d'ouverture</h3>
            <ul>
                ${Object.entries(salon.horaires).map(([jour, heures]) => `<li><strong>${jour} :</strong> ${heures}</li>`).join('')}
            </ul>

            <h3>Moyens de paiement</h3>
            <ul>
                ${salon.paiements.map(moyen => `<li>${moyen}</li>`).join('')}
            </ul>
        `;
    })
    .catch(error => console.error("Erreur lors du chargement des informations :", error));
});

// ---------------------- API ----------------------
const apiKey = '9e39ae68aa7ea0020fe369bf9feb4cda';
const city = 'Strasbourg';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Erreur de récupération de la météo");

        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed * 3.6); // Convertir m/s en km/h

        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("feels-like").textContent = `${feelsLike}°C`;
        document.getElementById("humidity").textContent = `${humidity}%`;
        document.getElementById("wind-speed").textContent = `${windSpeed} km/h`;

        // message en fonction de la température
        let message = "";
        if (temperature >= 18 && temperature <= 28) {
            message = "☀️ Une journée idéale pour un massage relaxant.";
        } else if (temperature < 18) {
            message = "❄️ Il fait frais... Un massage réchauffant serait parfait.";
        } else {
            message = "🔥 Il fait chaud ! Un massage rafraîchissant vous ferait du bien.";
        }

        document.getElementById("massage-message").textContent = message;
    } catch (error) {
        document.getElementById("temperature").textContent = "--°C";
        document.getElementById("feels-like").textContent = "--°C";
        document.getElementById("humidity").textContent = "--%";
        document.getElementById("wind-speed").textContent = "-- km/h";
        document.getElementById("massage-message").textContent = "❌ Impossible de récupérer la météo.";
        console.error(error);
    }
}

// météo dès l'ouverture de la page
document.addEventListener("DOMContentLoaded", getWeather);

//----------------------------------formulaire------------------

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const privacyCheckbox = document.getElementById("privacy-policy");

    form.addEventListener("submit", function (event) {
        let isValid = true;
        let errorMessage = "";

        //  Vérifie que tous les champs sont remplis
        if (!nameInput.value.trim() || !emailInput.value.trim() || !subjectInput.value.trim() || !messageInput.value.trim()) {
            errorMessage += "Veuillez remplir tous les champs obligatoires.\n";
            isValid = false;
        }

        //  Vérifie si l'email est valide
        if (!validateEmail(emailInput.value)) {
            errorMessage += "Veuillez entrer une adresse email valide.\n";
            isValid = false;
        }

        //  Vérifie que la case de politique de confidentialité est cochée
        if (!privacyCheckbox.checked) {
            errorMessage += "Vous devez accepter la politique de confidentialité avant d'envoyer le formulaire.\n";
            isValid = false;
        }

        if (!isValid) {
            alert(errorMessage); // Affiche les erreurs
            event.preventDefault(); // Bloque l'envoi du formulaire
            return;
        }

        //  Simulation d'un envoi (remplace par AJAX si besoin)
        event.preventDefault();
        alert("Votre message a été envoyé avec succès !");
        form.reset(); // Réinitialise le formulaire
    });

    //  Fonction pour vérifier le format de l'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
