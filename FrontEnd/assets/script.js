// Prévient event de default
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Vérifie si les champs email et mot de passe sont remplis
    if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
        // test
        console.log('Vérifiez les données et réessayez !');
        // affiche erreur verifierDonnées
        let verifierDonnees = document.getElementById(`verifierDonnées`)
        verifierDonnees.textContent = `Vérifiez les données et réessayez !`;

        // Animation erreur verifierDonnées
        verifierDonnees.animate([
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 1000, // durée
            iterations: 2 // répétitions
        });

    } else {
        // Si tout est bon crée la const user
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        };
        console.log(user);

        let classefetch;

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                classefetch = json;
                console.log(`fetch: `, classefetch);

                // Verification user
                if (checkDonnees(classefetch)) {
                    // Si ok renvoi à userlogged.html
                    window.location.href = 'userlogged.html';
                } else {
                    // Autrement erreur
                    console.log("Errore dans l’identifiant ou le mot de passe");
                    verifierDonnees.textContent = `Vérifiez les données et réessayez !`;
                }
            })
            .catch(e => {
                console.log('There was a problem with your fetch operation: ' + e.message);
            });
    }

    function checkDonnees(serverData) {
        // True si donnees ok, autrement false
        return serverData.token;
    }
})
