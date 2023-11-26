// Fonction pour vérifier si l'utilisateur est authentifié
export function isAuthenticated() {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
}

// Fonction pour effectuer la Login
export function login(email, password) {
    const user = {
        email: email,
        password: password
    };

    return fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        // Vérification des données du serveur
        if (checkData(json)) {
            // Sauvegarde du jeton dans le localStorage
            localStorage.setItem('authToken', json.token);
            updateLoginLink(); // Met à jour dynamiquement le lien de Login/Logout
            return true; // Login réussie
        } else {
            return false; // Login échouée
        }
    })
    .catch(error => {
        console.error('Problème avec votre opération fetch :', error);
        return false; // Login échouée en raison d'une erreur
    });
}

// Fonction pour effectuer la Logout
export function logout() {
    // Supprime le jeton du localStorage
    localStorage.removeItem('authToken');
    updateLoginLink(); // Met à jour dynamiquement le lien de Login/Logout
}

// Fonction pour vérifier les données du serveur
function checkData(serverData) {
    return serverData.token;
}

// Fonction pour mettre à jour dynamiquement le lien de Login/Logout
function updateLoginLink() {
    const loginLink = document.getElementById('loginLink');

    if (isAuthenticated()) {
        // Si l'utilisateur est authentifié, configure le lien sur "Logout" et associe la fonction de Logout
        loginLink.textContent = 'Logout';
        loginLink.href = '#'; // Remplacez par l'URL ou la fonction de Logout appropriée
        loginLink.addEventListener('click', logout);

        // Crée un nouvel élément li pour le lien vers la page utilisateur
        const userPageLink = document.createElement('li');
        const userPageAnchor = document.createElement('a');
        userPageAnchor.href = 'logged.html'; // Modifiez ici pour rediriger vers logged.html
        userPageAnchor.textContent = 'Modifier';
        userPageLink.appendChild(userPageAnchor);

        // Récupère la liste ul parente
        const navList = loginLink.parentElement.parentElement;

        // Ajoute le nouvel élément li après le deuxième élément (index 2, basé sur zéro)
        navList.insertBefore(userPageLink, navList.children[2]);
    } else {
        // Si l'utilisateur n'est pas authentifié, configure le lien sur "Login" et associe l'URL de la page de Login
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html';

        // Supprime le lien vers la page utilisateur s'il existe
        const userPageLink = document.querySelector('#userPageLink');
        if (userPageLink) {
            userPageLink.remove();
        }
    }
}

// Appel initial pour mettre à jour le lien en fonction de l'état d'authentification lors du chargement de la page
updateLoginLink();
