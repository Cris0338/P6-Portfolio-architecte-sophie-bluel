// Initialise la variable au début du fichier
let classefetch = null;

// Écouteur d'événement pour le formulaire de connexion
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
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
                classefetch = json;
                console.log(`fetch: `, classefetch);

                // Vérification des données de l'utilisateur
                if (checkDonnees(classefetch)) {
                    // Si tout est ok, redirige vers 'logged.html'
                    window.location.href = 'logged.html';

                    // Enregistre le jeton dans le localStorage
                    localStorage.setItem('authToken', classefetch.token);
                } else {
                    // Sinon, affiche une erreur
                    console.log("Erreur dans l'identifiant ou le mot de passe");
                    verifierDonnees.textContent = "Identifiants incorrects. Veuillez réessayer.";

                }
            })
            .catch(e => {
                console.log("Il y a eu un problème avec votre opération fetch : " + e.message);
                verifierDonnees.textContent = "Identifiants incorrects. Veuillez réessayer.";
            });
            
    }

    function checkDonnees(serverData) {
        // Renvoie true si les données sont ok, sinon renvoie false
        console.log("checkDonnees: ", serverData.token);
        return serverData.token;
    }
});
