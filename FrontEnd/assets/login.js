let classefetch = null; // Initialise la variable au début du fichier

// Écouteur d'événement pour le formulaire de connexion
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Vérifie si les champs email et mot de passe sont remplis
    if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
        // test
        console.log('Vérifiez les données et réessayez !');
        // Affiche un message d'erreur dans le champ verifierDonnées
        let verifierDonnees = document.getElementById(`verifierDonnées`)
        verifierDonnees.textContent = `Vérifiez les données et réessayez !`;

        // Animation d'erreur pour verifierDonnées
        verifierDonnees.animate([
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 1000, // durée
            iterations: 2 // répétitions
        });

    } else {
        // Si tout est bon, crée la constante user
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        };
        console.log(user);

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
                    verifierDonnees.textContent = `Vérifiez les données et réessayez !`;
                }
            })
            .catch(e => {
                console.log("Il y a eu un problème avec votre opération fetch : " + e.message);
            });
    }

    function checkDonnees(serverData) {
        // Renvoie true si les données sont ok, sinon renvoie false
        return serverData.token;
    }
})
