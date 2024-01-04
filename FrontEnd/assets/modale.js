// modale.js

// Importe la fonction getAllData depuis le fichier api.js
import { getAllData } from './api.js';

// Obtien les données de l'API
let projects = await getAllData();

// Obtien des références aux éléments HTML
const galleryModal = document.getElementById('galleryModal');
const galleryContent = document.querySelector('.gallery-content');
const overlay = document.querySelector('.modal-overlay');
const uploadModal = document.getElementById('uploadModal');
const modifierContainer = document.querySelector('.modifiercontainer');

// Affiche la modal de la galerie
galleryModal.style.display = 'flex';

// Fonction pour afficher les projets dans la modal
export function renderProjectsModal(projects) {
    // Vide le contenu de la galerie
    galleryContent.innerHTML = '';

    // Parcoure chaque projet
    projects.forEach(project => {
        // Crée un élément pour la vignette
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');

        // Crée un élément pour l'image
        const imgElement = document.createElement('img');
        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;

        // Crée une icône pour la suppression
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash-alt');

        // Ajoute un écouteur d'événements pour la suppression de l'image
        deleteIcon.addEventListener('click', () => {
            // Supprime l'image
            deleteImageCallback(project.id);
        });

        // Ajoute l'image et l'icône à la vignette
        thumbnail.appendChild(imgElement);
        thumbnail.appendChild(deleteIcon);

        // Ajoute la vignette à la galerie
        galleryContent.appendChild(thumbnail);
    });
}

// Affiche les projets dans la modal
renderProjectsModal(projects);

// Ajoute un écouteur d'événements pour fermer la modal lorsque l'utilisateur clique en dehors de celle-ci
overlay.addEventListener('click', closeModal);

// Ajoute un écouteur d'événements pour l'icône de fermeture
const xMarkIcon = document.querySelector('.fa-xmark');
xMarkIcon.addEventListener('click', () => {
    // Ferme la modal d'upload et ouvrez la modal de la galerie
    uploadModal.style.display = 'none';
    galleryModal.style.display = 'flex';
    // Rétablisse le défilement de la page
    document.body.style.overflow = '';
    // Cache l'overlay
    overlay.style.display = 'none';
});

// Ajoute un écouteur d'événements pour ouvrir la modale lorsque l'utilisateur clique sur le conteneur de modification
modifierContainer.addEventListener('click', openModal);

// Fonction pour fermer la modale
function closeModal(event) {
    // Vérifie si l'utilisateur a cliqué à l'intérieur de la modale
    const isInsideModal = event.target.closest('.modal') || event.target.closest('.modal2');

    // Si l'utilisateur a cliqué en dehors de la modale, ferme celle-ci
    if (!isInsideModal) {
        // Ferme la modal d'upload et ouvrez la modale de la galerie
        uploadModal.style.display = 'none';
        galleryModal.style.display = 'flex';
        // Rétablis le défilement de la page
        document.body.style.overflow = '';
        // Cache l'overlay
        overlay.style.display = 'none';
    }
}

// Fonction pour ouvrir la modale
function openModal() {
    // Empêche le défilement de la page
    document.body.style.overflow = 'hidden';
    // Affiche l'overlay
    overlay.style.display = 'flex';
}

// Fonction pour supprimer une image
async function deleteImageCallback(projectId) {
    try {
        // Envoye une requête DELETE à l'API
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
            }
        });

        // Si la requête a échoué, lancez une erreur
        if (!response.ok) {
            throw new Error(`Erreur HTTP! status: ${response.status}`);
        }

        // Met à jour la liste des projets
        projects = projects.filter(project => project.id !== projectId);
        // Met à jour l'affichage des projets
        renderProjects(projects);
        renderProjectsModal(projects);
    } catch (error) {
        // Si une erreur s'est produite, affiche-la dans la console
        console.error('Il y a eu un problème avec l\'opération fetch:', error);
    }
}

// Fonction pour afficher les projets
export function renderProjects(projects) {
    const gallery = document.querySelector('.gallery');
    // Vide la galerie
    gallery.innerHTML = '';

    // Parcoure chaque projet
    projects.forEach(project => {
        // Crée un élément pour le projet
        const projectElement = document.createElement('figure');

        // Crée un élément pour l'image
        const imgElement = document.createElement('img');
        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;

        // Crée un élément pour le titre
        const titleElement = document.createElement('figcaption');
        titleElement.textContent = project.title;

        // Ajoute l'image et le titre au projet
        projectElement.appendChild(imgElement);
        projectElement.appendChild(titleElement);

        // Ajoute le projet à la galerie
        gallery.appendChild(projectElement);
    });
}

// Obtien une référence à l'élément 'ajout-photo'
const addPhoto = document.getElementById('ajout-photo');

// Ajoute un écouteur d'événements pour ouvrir la modal d'upload lorsque l'utilisateur clique sur 'ajout-photo'
addPhoto.addEventListener('click', () => {
    // Ferme la modal de la galerie et ouvrez la modal d'upload
    galleryModal.style.display = 'none';
    uploadModal.style.display = 'flex';
});

// Obtien une référence à l'icône de retour
const backBtn = document.querySelector('.fa-arrow-left');

// Ajoute un écouteur d'événements pour fermer la modal d'upload et ouvrir la modal de la galerie lorsque l'utilisateur clique sur l'icône de retour
backBtn.addEventListener('click', () => {
    // Ferme la modal d'upload et ouvrez la modal de la galerie
    uploadModal.style.display = 'none';
    galleryModal.style.display = 'flex';
});
