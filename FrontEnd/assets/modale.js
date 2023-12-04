import { getAllData } from './api.js';

// Ottieni tutti i dati dall'API
let projects = await getAllData();

const galleryModal = document.getElementById('galleryModal');
galleryModal.style.display = 'flex';

// Crea il contenuto della galleria
const galleryContent = document.querySelector(`.gallery-content`);

function renderProjectsModale(projects) {
    galleryContent.innerHTML = ``;
    projects.forEach(project => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash-alt');

        // Aggiungi un evento di clic per eliminare l'immagine
        deleteIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteImageCallback(project.id); // Si presume che ogni progetto abbia un ID univoco
        });

        thumbnail.appendChild(imgElement);
        thumbnail.appendChild(deleteIcon);

        galleryContent.appendChild(thumbnail);
    });
}

renderProjectsModale(projects)

// Quando la modale è aperta, aggiungi l'overlay e disabilita lo scrolling del body
const overlay = document.querySelector('.modal-overlay');

// Quando la modale è chiusa, rimuovi l'overlay e riabilita lo scrolling del body
overlay.addEventListener('click', (event) => {
    // Nascondi la modale uploadModal
    uploadModal.style.display = 'none';

    // Mostra la modale galleryModal
    galleryModal.style.display = 'flex';

    // Riabilita lo scrolling del body
    document.body.style.overflow = '';

    // Rimuovi l'overlay
    overlay.style.display = 'none';

    // Ferma la propagazione dell'evento click
    event.stopPropagation();
    
});

// Seleziona il div .modifiercontainer
let modifierContainer = document.querySelector('.modifiercontainer');


// Aggiungi un gestore di eventi al div .modifiercontainer per aprire la modale
modifierContainer.addEventListener('click', openModal);

// Definisci la funzione openModal
function openModal() {
    // Aggiungi qui la logica per aprire la modale
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'flex';
}

// Fonction pour supprimer une image
async function deleteImageCallback(projectId) {
    // Logique pour supprimer l'image depuis le backend (en utilisant projectId)
    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken') // utilise le token d'authentification stocké dans le localStorage
            }
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP! status: ${response.status}`);
        }
        // Met à jour la modale après la suppression
        projects = projects.filter(project => project.id !== projectId);
        renderProjects(projects);
        renderProjectsModale(projects);
    } catch (error) {
        console.error('Il y a eu un problème avec l\'opération fetch:', error);
    }
}

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

// Aggiungi un gestore di eventi al pulsante "Ajouter une photo" nella modale galleryModal
const addPhoto = document.getElementById('ajout-photo');

addPhoto.addEventListener('click', (event) => {
    // Nascondi la modale galleryModal
    galleryModal.style.display = 'none';
    
    // Mostra la modale uploadModal
    const uploadModal = document.getElementById('uploadModal');
    uploadModal.style.display = 'flex';

    // Ferma la propagazione dell'evento click per evitare la chiusura della modale
    event.stopPropagation();
});

// Aggiungi un gestore di eventi freccia indietro
const backBtn = document.querySelector('.fa-arrow-left');

backBtn.addEventListener('click', (event) => {
    // Nascondi la modale uploadModal
    uploadModal.style.display = 'none';
    
    // Mostra la modale galleryModal
    galleryModal.style.display = 'flex';

    // Ferma la propagazione dell'evento click per evitare la chiusura della modale
    event.stopPropagation();
});
