// Importation des données depuis l'API
import { getAllData } from "./api.js";

// Création du tableau de tous les projets
let allProjects = [];

// Fonction pour afficher les projets dans la galerie
function renderProjects(projects) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    projects.forEach(project => {
        // Création de l'élément figure
        const projectElement = document.createElement('figure');

        const imgElement = document.createElement('img');
        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;

        // Création du titre
        const titleElement = document.createElement('figcaption');
        titleElement.textContent = project.title;

        // Ajout de l'image et du titre
        projectElement.appendChild(imgElement);
        projectElement.appendChild(titleElement);

        // Ajout du projet à la galerie
        gallery.appendChild(projectElement);
    });
}

// Fonction pour créer les boutons de filtre
function createFilterButtons(categories) {
    const filterButtonsContainer = document.querySelector('.filter-buttons');

    // Ajout du bouton "Tous" avec la classe active par défaut
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.classList.add('active'); // Ajout de la classe active
    allButton.onclick = () => filterProjects('all', allButton);
    filterButtonsContainer.appendChild(allButton);

    // Ajout des boutons de catégorie obtenus dynamiquement
    categories.forEach(categoryName => {
        const categoryButton = document.createElement('button');
        categoryButton.textContent = categoryName;
        categoryButton.onclick = () => filterProjects(categoryName, categoryButton);
        filterButtonsContainer.appendChild(categoryButton);

        // Ajout de la classe non-active et couleur par défaut
        categoryButton.classList.add('non-active');
        categoryButton.style.color = '#1D6154';

        // Event listener pour gérer le style pendant l'hover pour les boutons non actifs
        categoryButton.addEventListener('mouseover', () => {
            if (!categoryButton.classList.contains('active')) {
                categoryButton.style.color = 'white';
            }
        });

        // Réinitialisation de la couleur du texte après l'hover pour les boutons non actifs
        categoryButton.addEventListener('mouseout', () => {
            if (!categoryButton.classList.contains('active')) {
                categoryButton.style.color = '#1D6154';
            }
        });
    });

    // Gestion spécifique de l'hover pour le bouton "Tous"
    allButton.addEventListener('mouseover', () => {
        if (!allButton.classList.contains('active')) {
            allButton.style.color = 'white';
        }
    });

    // Réinitialisation de la couleur du texte après l'hover pour le bouton "Tous"
    allButton.addEventListener('mouseout', () => {
        if (!allButton.classList.contains('active')) {
            allButton.style.color = '#1D6154';
        }
    });
}

// Fonction pour filtrer les projets par catégorie
function filterProjects(categoryName, button) {
    // Suppression de la classe "active" et ajout de "non-active"
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('non-active');
        // Réinitialisation de la couleur du texte pour tous les boutons
        btn.style.color = '#1D6154';
    });

    // Ajout de la classe "active" uniquement au bouton sélectionné
    button.classList.add('active');
    // Changement de la couleur du texte pour le bouton sélectionné
    button.style.color = 'white';

    if (categoryName === 'all') {
        renderProjects(allProjects); // Affiche tous les projets
    } else {
        const filteredProjects = allProjects.filter(project => project.category.name === categoryName);
        renderProjects(filteredProjects); // Affiche uniquement la catégorie sélectionnée
    }
}

// Fonction pour charger tous les projets
async function loadProjects() {
    try {
        allProjects = await getAllData();

        // Obtenir les catégories uniques des projets
        const uniqueCategories = [...new Set(allProjects.map(project => project.category.name))];

        // Créer les boutons de filtre en utilisant les catégories obtenues dynamiquement
        createFilterButtons(uniqueCategories);

        renderProjects(allProjects);
    } catch (error) {
        console.error('Erreur dans le chargement des projets:', error);
    }
}

// Appel à la fonction de chargement des projets
loadProjects();
