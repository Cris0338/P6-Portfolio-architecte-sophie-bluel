//  gallery.js

// Importation de la fonction getAllData depuis le fichier api.js
import { getAllData } from './api.js';

// Attente du chargement complet du DOM avant d'exécuter le code
document.addEventListener('DOMContentLoaded', async function () {
    // Sélection de l'élément HTML avec la classe 'gallery'
    const galleryContainer = document.querySelector('.gallery');

    // Obtention de toutes les données depuis l'API de manière asynchrone
    const data = await getAllData();

    // Création dynamique des éléments de la galerie
    data.forEach(item => {
        // Création d'un élément div pour chaque élément de la galerie
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        // Ajout de l'attribut data-category
        galleryItem.dataset.category = item.category.name;

        // Création d'une balise img pour l'image de l'élément
        const image = document.createElement('img');
        image.src = item.imageUrl;
        image.alt = item.title;

        // Création d'une balise h3 pour le titre de l'élément
        const title = document.createElement('h3');
        title.textContent = item.title;

        // Ajout de l'image et du titre à l'élément de la galerie
        galleryItem.appendChild(image);
        galleryItem.appendChild(title);

        // Ajout de l'élément de la galerie au conteneur de la galerie
        galleryContainer.appendChild(galleryItem);
    });
});

// Fonction pour filtrer la galerie en fonction de la catégorie
export function filterGallery(category) {
    // Sélection de tous les éléments de la galerie
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Itération sur chaque élément de la galerie
    galleryItems.forEach(item => {
        // Détermination si l'élément doit être affiché en fonction de la catégorie
        const shouldShow = category === 'Tous' || item.dataset.category === category;
        // Définition de l'affichage de l'élément en conséquence
        item.style.display = shouldShow ? 'block' : 'none';
    });
}

