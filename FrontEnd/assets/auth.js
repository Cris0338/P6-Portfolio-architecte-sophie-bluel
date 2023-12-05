// auth.js
let loginLink = document.getElementById('loginLink');

// Controlla se l'utente è loggato
function checkUserLoggedIn() {
    let token = localStorage.getItem('authToken');
    if (token) {
        // Se l'utente è loggato, cambia il testo del link in "Logout"
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', logout);

        // Aggiungi il link a logged.html nel menu
        let ul = document.querySelector('nav ul');
        let newLi = document.createElement('li');
        let newLink = document.createElement('a');
        newLink.href = 'logged.html';
        newLink.textContent = 'Modifier';
        newLi.appendChild(newLink);

        // Inserisci il nuovo elemento li in terza posizione
        ul.insertBefore(newLi, ul.children[2]);
    } else {
        // Se l'utente non è loggato, assicurati che il link punti alla pagina di login
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html';
        // Se l'utente non è loggato e sta cercando di accedere a logged.html, reindirizzalo a login.html
        if (window.location.pathname.endsWith('logged.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Funzione per gestire il logout
function logout(event) {
    event.preventDefault();
    // Rimuove il token dal localStorage
    localStorage.removeItem('authToken');
    // Reindirizza l'utente alla pagina di login
    window.location.href = 'login.html';
}

// Esegui la funzione checkUserLoggedIn quando la pagina viene caricata
window.addEventListener('DOMContentLoaded', checkUserLoggedIn);

// Aggiungi un gestore per l'evento beforeunload
window.addEventListener('beforeunload', function () {
    // Esegui il logout prima che l'utente lasci la pagina
    logout();
});
