// logged.js

// Importation des données depuis l'API
import { getAllData } from "./api.js";
// Importe les fonctions d'authentification depuis auth.js
import { isAuthenticated, logout } from "./auth.js";
// Importe la fonction displayModal depuis modale.js
import { displayModal } from "./modale.js";

// Initialisation du tableau des projets
let allProjects = [];

// Fonction pour afficher les projets dans la galerie
function renderProjects(projects) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement('figure');

        const imgElement = document.createElement('img');
        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;

        const titleElement = document.createElement('figcaption');
        titleElement.textContent = project.title;

        projectElement.appendChild(imgElement);
        projectElement.appendChild(titleElement);

        gallery.appendChild(projectElement);
    });
}

// Fonction pour ajouter dynamiquement l'icône et le texte "modifier"
function addModifierButton() {
    const projectsSection = document.getElementById('portfolio');

    // Crée le conteneur pour l'icône et le texte "modifier"
    const modifierContainer = document.createElement('div');
    modifierContainer.classList.add('modifier-container');

    // Crée l'élément de l'icône
    const icon = document.createElement('i');
    icon.classList.add('far', 'fa-pen-to-square');

    // Crée l'élément du texte "modifier"
    const text = document.createTextNode('modifier');

    // Ajoute les nouveaux éléments au conteneur
    modifierContainer.appendChild(icon);
    modifierContainer.appendChild(text);

    // Ajoute le conteneur à la section des projets
    projectsSection.appendChild(modifierContainer);

    // Ajoute un événement de clic pour afficher la modale
    modifierContainer.addEventListener('click', displayModalWrapper);
}

// Fonction pour afficher la modale
function displayModalWrapper() {
    displayModal(allProjects, deleteImage);
}

// Fonction pour supprimer une image
async function deleteImage(projectId) {
    // Logique pour supprimer l'image depuis le backend (en utilisant projectId)
    try {
        const response = await fetch(`/works/${projectId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Met à jour la modale après la suppression
        allProjects = allProjects.filter(project => project.id !== projectId);
        displayModal(allProjects, deleteImage);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Fonction pour charger tous les projets
async function loadProjects() {
    try {
        allProjects = await getAllData();
        renderProjects(allProjects);
        addModifierButton();
    } catch (error) {
        console.error('Erreur lors du chargement des projets :', error);
    }
}

// Appel de la fonction de chargement des projets
loadProjects();

// Fonction pour mettre à jour dynamiquement le lien de connexion/déconnexion
function updateLoginLink() {
    const loginLink = document.getElementById('loginLink');

    if (isAuthenticated()) {
        // Si l'utilisateur est authentifié, définir le lien sur 'logout.html'
        loginLink.href = 'logout.html';
        loginLink.textContent = 'Logout';
    } else {
        // Si l'utilisateur n'est pas authentifié, définir le lien sur 'login.html'
        loginLink.href = 'login.html';
        loginLink.textContent = 'Login';
    }
}

// Appeler la fonction au démarrage de la page
updateLoginLink();
