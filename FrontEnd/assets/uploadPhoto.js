// uploadPoto.js
import { getAllData } from './api.js';
import { renderProjects, renderProjectsModal } from './modale.js'
import { toggleUploadElements } from './addPhoto.js';

// Obtien des références aux éléments HTML
const image = document.getElementById("up-photo");
const title = document.getElementById('titre');
const category = document.getElementById('dropdown');
const overlay = document.querySelector('.modal-overlay');
const uploadModal = document.getElementById('uploadModal');

// Ajoute des écouteurs d'événements pour vérifier les entrées
image.addEventListener('change', inputCheck)
title.addEventListener('change', inputCheck)
category.addEventListener('change', inputCheck)

// Ajoute un écouteur d'événements pour le chargement du document
// document.addEventListener('DOMContentLoaded', function () {
const submitBtn = document.getElementById('valider');

// Ajoute un écouteur d'événements pour le clic sur le bouton de soumission
submitBtn.addEventListener('click', async function () {

    // Vérifie si tous les champs sont remplis
    if (title.value && category.value && image.files[0]) {
        // Crée un nouvel objet FormData et ajoutez les valeurs des champs
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('category', category.value);
        formData.append('image', image.files[0]);

        // Envoye la photo
        await uploadPhoto(formData);

        // Recharge les projets
        const data = await getAllData();
        renderProjects(data);
        renderProjectsModal(data);

        // Ferme la modale et l'overlay
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        uploadModal.style.display = 'none';
        galleryModal.style.display = 'flex';

        // Reset des valeurs des champs
        image.value = '';
        title.value = '';
        category.value = '';
        document.getElementById("selected-image").remove();
        document.getElementById("trashIcon").remove();
        inputCheck();
        toggleUploadElements(true);

    } else {
        // Si tous les champs ne sont pas remplis, affiche une alerte
        alert('Remplissez tous les champs avant d\'envoyer.');
    }
});
// });

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
                'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
            },
            body: formData,
        });

        // Si la requête a échoué, lance une erreur
        if (!response.ok) {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }

        // Supprime l'image temporaire du sessionStorage
        sessionStorage.removeItem('temporaryImage');


    } catch (error) {
        // Si une erreur s'est produite, affiche-la dans la console
        console.error('Une erreur s\'est produite lors de l\'opération fetch :', error);
    }
}



