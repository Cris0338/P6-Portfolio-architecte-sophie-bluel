// Funzione per verificare se l'utente è autenticato
function checkAuthentication() {
    // Esempio: verifica se esiste un token salvato nel localStorage
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
}

// Controlla l'autenticazione prima di caricare i progetti
if (!checkAuthentication()) {
    // Se l'utente non è autenticato, reindirizzalo alla pagina di login
    window.location.href = 'login.html';
} else {
    // Se l'utente è autenticato, carica i progetti
    loadProjects();
}

// Importazione dei dati dall'API
import { getAllData } from "./api.js";

// Inizializzazione del vettore dei progetti
let allProjects = [];

// Funzione per visualizzare i progetti nella galleria
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

// Funzione per aggiungere dinamicamente l'icona e il testo "modifier"
function addModifierButton() {
    const projectsSection = document.getElementById('portfolio');

    // Crea il container per l'icona e il testo "modifier"
    const modifierContainer = document.createElement('div');
    modifierContainer.classList.add('modifier-container');

    // Crea l'elemento dell'icona
    const icon = document.createElement('i');
    icon.classList.add('far', 'fa-pen-to-square');

    // Crea l'elemento del testo "modifier"
    const text = document.createTextNode('modifier');

    // Aggiungi i nuovi elementi al container
    modifierContainer.appendChild(icon);
    modifierContainer.appendChild(text);

    // Aggiungi il container alla sezione dei progetti
    projectsSection.appendChild(modifierContainer);

    // Aggiungi un evento di clic per visualizzare la modale
    modifierContainer.addEventListener('click', () => {
        displayModal();
    });
}

// Funzione per visualizzare la modale
function displayModal() {
    const galleryModal = document.getElementById('galleryModal');
    galleryModal.style.display = 'block';

    // Aggiungi il contenuto alla modale
    const galleryContent = document.createElement('div');
    galleryContent.classList.add('gallery-content');

    allProjects.forEach(project => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('far', 'fa-trash-alt');

        // Aggiungi evento di clic per eliminare l'immagine
        deleteIcon.addEventListener('click', () => {
            deleteImage(project.id); // Assumi che ogni progetto abbia un ID univoco
        });

        thumbnail.appendChild(imgElement);
        thumbnail.appendChild(deleteIcon);

        galleryContent.appendChild(thumbnail);
    });

    galleryModal.innerHTML = '';
    galleryModal.appendChild(galleryContent);
}

// Funzione per eliminare un'immagine
function deleteImage(projectId) {
    // Logica per eliminare l'immagine dal backend (utilizzando projectId)
    // Aggiorna la modale dopo l'eliminazione
    displayModal();
}

// Funzione per caricare tutti i progetti
async function loadProjects() {
    try {
        allProjects = await getAllData();
        renderProjects(allProjects);
        addModifierButton();
    } catch (error) {
        console.error('Errore nel caricamento dei progetti:', error);
    }
}

// Chiamata alla funzione di caricamento dei progetti
loadProjects();
