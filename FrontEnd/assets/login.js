// Initialise la variable au début du fichier
let classefetch = null;

// Écouteur d'événement pour le formulaire de connexion
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Récupération des éléments input pour l'email et le mot de passe
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    // Récupération de l'élément pour afficher les messages d'erreur
    let verifierDonnees = document.getElementById('verifierDonnees');
    verifierDonnees.style.color = 'red';
    verifierDonnees.style.fontSize = '20px';
    verifierDonnees.style.whiteSpace = 'nowrap';

    // Animation d'erreur pour verifierDonnées
    verifierDonnees.animate(
        [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000, // durée
            iterations: 2 // répétitions
        });

    // Vérifie si les champs email et mot de passe sont remplis
    if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {

        // Affiche un message d'erreur dans le champ verifierDonnées
        verifierDonnees.textContent = "Veuillez remplir tous les champs.";

        return;
    } else {
        // Si tout est bon, crée la constante user
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        };

        // Déclare la variable classefetch pour qu'elle soit accessible dans tout le fichier
        fetch('http://localhost:5678/api/users/login', {
            // Spécifie la méthode HTTP utilisée (POST pour l'authentification)
            method: 'POST', 
            headers: {
                // Indique que le contenu envoyé est au format JSON
                'Content-Type': 'application/json', 
            },
            // Convertit l'objet user en chaîne JSON pour l'envoyer dans le corps de la requête
            body: JSON.stringify(user), 
        })
            .then(response => {
                // Gère la réponse de la requête HTTP
                if (!response.ok) {
                    // Si la réponse n'est pas OK, lance une erreur avec le statut HTTP
                    throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
                }
                // Convertit la réponse en JSON
                return response.json(); 
            })
            .then(json => {
                // La réponse du serveur est stockée dans la variable classefetch
                classefetch = json;

                // Vérification des données de l'utilisateur
                if (checkDonnees(classefetch)) {
                    // Si tout est ok, redirige vers 'logged.html'
                    window.location.href = 'logged.html';

                    // Enregistre le jeton dans le sessionStorage
                    sessionStorage.setItem('authToken', classefetch.token);
                } else {
                    // Sinon, affiche une erreur
                    console.log("Erreur dans l'identifiant ou le mot de passe");
                    verifierDonnees.textContent = "Identifiants incorrects. Veuillez réessayer.";

                }
            })
            .catch(e => {
                // Gestion des erreurs liées à l'opération fetch
                console.log("Il y a eu un problème avec votre opération fetch : " + e.message);
                verifierDonnees.textContent = "Identifiants incorrects. Veuillez réessayer.";
            });

    }

    function checkDonnees(serverData) {
        // Renvoie true si les données sont ok, sinon renvoie false
        return serverData.token;
    }
});
