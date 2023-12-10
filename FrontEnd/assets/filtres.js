// filtres.js

// Importation des modules nécessaires depuis les fichiers gallery.js et api.js
import { getAllCategories } from './api.js';
import { filterGallery } from './gallery.js';

// Événement déclenché lorsque le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', async function () {
    // Sélection de l'élément HTML avec la classe 'filtres'
    const filtersContainer = document.querySelector('.filtres');

    // Obtention de toutes les catégories depuis l'API
    const categories = await getAllCategories(); // Utilisation de la fonction getAllCategories au lieu de getAllData

    // Création et ajout du bouton "Tous" à la fin de l'élément existant
    const allButton = createFilterButton('Tous');
    allButton.addEventListener('click', () => handleFilterClick(allButton, 'Tous'));
    filtersContainer.appendChild(allButton);

    // Ajout des boutons pour chaque catégorie existante
    categories.forEach(category => {
        const categoryButton = createFilterButton(category.name); // Utilisation de category.name comme texte du bouton
        categoryButton.addEventListener('click', () => handleFilterClick(categoryButton, category.name));
        filtersContainer.appendChild(categoryButton);
    });

    // Définition du bouton "Tous" comme actif au chargement de la page
    allButton.classList.add('active');
});

// Fonction pour créer un bouton de filtre avec le nom de la catégorie
function createFilterButton(categoryName) {
    const button = document.createElement('button');
    button.textContent = categoryName;
    return button;
}

// Fonction pour gérer le clic sur un bouton de filtre
function handleFilterClick(clickedButton, categoryName) {
    // Retire la classe 'active' de tous les boutons
    const allButtons = document.querySelectorAll('.filtres button');
    allButtons.forEach(button => button.classList.remove('active'));

    // Ajoute la classe 'active' au bouton cliqué
    clickedButton.classList.add('active');

    // Appel à la fonction filterGallery avec la catégorie sélectionnée
    filterGallery(categoryName);
}
