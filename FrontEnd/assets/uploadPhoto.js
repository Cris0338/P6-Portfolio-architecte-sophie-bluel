// uploadPoto.js

// Obtien des références aux éléments HTML
const image = document.getElementById("up-photo");
const title = document.getElementById('titre');
const category = document.getElementById('dropdown');

// Ajoute des écouteurs d'événements pour vérifier les entrées
image.addEventListener('change', inputCheck)
title.addEventListener('change', inputCheck)
category.addEventListener('change', inputCheck)

// Ajoute un écouteur d'événements pour le chargement du document
document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('valider');

    // Ajoute un écouteur d'événements pour le clic sur le bouton de soumission
    submitBtn.addEventListener('click', function () {

        // Vérifie si tous les champs sont remplis
        if (title.value && category.value && image.files[0]) {
            // Crée un nouvel objet FormData et ajoutez les valeurs des champs
            const formData = new FormData();
            formData.append('title', title.value);
            formData.append('category', category.value);
            formData.append('image', image.files[0]);

            // Envoye la photo
            uploadPhoto(formData);
        } else {
            // Si tous les champs ne sont pas remplis, affiche une alerte
            alert('Remplissez tous les champs avant d\'envoyer.');
        }
    });
});

// Fonction pour vérifier les entrées
function inputCheck() {
    const valider = document.getElementById('valider');
    // Si tous les champs sont remplis, change la couleur du bouton de validation
    if (title.value && category.value && image.files[0]) {
        valider.style.backgroundColor = '#1D6154'
        valider.style.borderColor = '#1D6154'
    }
    // Sinon, change la couleur du bouton de validation en gris
    else {
        valider.style.backgroundColor = '#A7A7A7'
        valider.style.borderColor = '#A7A7A7'
    }
}

// Fonction pour envoyer la photo
async function uploadPhoto(formData) {
    try {
        // Envoye une requête POST à l'API
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: formData,
        });

        // Si la requête a échoué, lance une erreur
        if (!response.ok) {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }

        // Supprime l'image temporaire du localStorage
        localStorage.removeItem('temporaryImage');

        // Redirige l'utilisateur vers la page 'logged.html'
        window.location.href = 'logged.html';
    } catch (error) {
        // Si une erreur s'est produite, affiche-la dans la console
        console.error('Une erreur s\'est produite lors de l\'opération fetch :', error);
    }
}
