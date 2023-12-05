import { getAllData } from './api.js';

// Ottieni tutti i dati dall'API
let projects = await getAllData();

const galleryModal = document.getElementById('galleryModal');
const galleryContent = document.querySelector('.gallery-content');
const overlay = document.querySelector('.modal-overlay');
const uploadModal = document.getElementById('uploadModal');
const modifierContainer = document.querySelector('.modifiercontainer');

galleryModal.style.display = 'flex';

function renderProjectsModal(projects) {
    galleryContent.innerHTML = '';
    projects.forEach(project => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash-alt');

        deleteIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteImageCallback(project.id);
        });

        thumbnail.appendChild(imgElement);
        thumbnail.appendChild(deleteIcon);

        galleryContent.appendChild(thumbnail);
    });
}

renderProjectsModal(projects);

overlay.addEventListener('click', closeModal);

// Aggiungi un event listener per l'icona fa-xmark
const xMarkIcon = document.querySelector('.fa-xmark');
xMarkIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    uploadModal.style.display = 'none';
    galleryModal.style.display = 'flex';
    document.body.style.overflow = '';
    overlay.style.display = 'none';
});

modifierContainer.addEventListener('click', openModal);

function closeModal(event) {
    const isInsideModal = event.target.closest('.modal') || event.target.closest('.modal2');

    if (!isInsideModal) {
        uploadModal.style.display = 'none';
        galleryModal.style.display = 'flex';
        document.body.style.overflow = '';
        overlay.style.display = 'none';
    }
}

function openModal() {
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'flex';
}

async function deleteImageCallback(projectId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP! status: ${response.status}`);
        }

        projects = projects.filter(project => project.id !== projectId);
        renderProjects(projects);
        renderProjectsModal(projects);
    } catch (error) {
        console.error('Il y a eu un problème avec l\'opération fetch:', error);
    }
}

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

const addPhoto = document.getElementById('ajout-photo');

addPhoto.addEventListener('click', (event) => {
    galleryModal.style.display = 'none';
    uploadModal.style.display = 'flex';
    event.stopPropagation();
});

const backBtn = document.querySelector('.fa-arrow-left');

backBtn.addEventListener('click', (event) => {
    uploadModal.style.display = 'none';
    galleryModal.style.display = 'flex';
    event.stopPropagation();
});
