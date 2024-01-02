// auth.js

// Obtien l'élément HTML 'loginLink'
let loginLink = document.getElementById('loginLink');

// Vérifie si l'utilisateur est connecté
function checkUserLoggedIn() {
    // Récupère le token du sessionStorage
    let token = sessionStorage.getItem('authToken');

    // Si le token existe, l'utilisateur est connecté
    if (token) {
        // Change le texte du lien en 'Logout'
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        // Ajoute un écouteur d'événements pour gérer la déconnexion
        loginLink.addEventListener('click', logout);

        // Ajoute le lien vers logged.html dans le menu
        let ul = document.querySelector('nav ul');
        let newLi = document.createElement('li');
        let newLink = document.createElement('a');
        newLink.href = 'logged.html';
        newLink.textContent = 'Modifier';
        newLi.appendChild(newLink);

        // Insère le nouvel élément li en troisième position
        ul.insertBefore(newLi, ul.children[2]);
    } else {
        // Si l'utilisateur n'est pas connecté, le lien pointe vers la page de connexion
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html';

        // Si l'utilisateur n'est pas connecté et essaie d'accéder à logged.html, redirige-le vers login.html
        if (window.location.pathname.endsWith('logged.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Fonction pour gérer la déconnexion
function logout(event) {
    if (event) {
        event.preventDefault();
    }
    // Supprime le token du sessionStorage
    sessionStorage.removeItem('authToken');
    // Redirige l'utilisateur vers la page de connexion
    window.location.href = 'login.html';
}

// Exécute la fonction checkUserLoggedIn lorsque la page est chargée
window.addEventListener('DOMContentLoaded', checkUserLoggedIn);
