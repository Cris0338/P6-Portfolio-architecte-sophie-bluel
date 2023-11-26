// Fonction pour afficher la modale
export function displayModal(projects, deleteImageCallback) {
    const galleryModal = document.getElementById('galleryModal');
    galleryModal.style.display = 'block';

    // Crée le conteneur principal de la modale
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    // Crée le titre "Galerie Photo"
    const titleElement = document.createElement('div');
    titleElement.classList.add('gallery-title');
    titleElement.textContent = 'Galerie Photo';
    modalContainer.appendChild(titleElement);

    // Crée le contenu de la galerie
    const galleryContent = document.createElement('div');
    galleryContent.classList.add('gallery-content');

    projects.forEach(project => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash-alt');

        // Ajoute un événement de clic pour supprimer l'image
        deleteIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteImageCallback(project.id); // On suppose que chaque projet a un ID unique
        });

        thumbnail.appendChild(imgElement);
        thumbnail.appendChild(deleteIcon);

        galleryContent.appendChild(thumbnail);
    });

    // Ajoute le contenu de la galerie au conteneur principal
    modalContainer.appendChild(galleryContent);

    // Ajoute le conteneur principal à la modale
    galleryModal.innerHTML = '';
    galleryModal.appendChild(modalContainer);

    // Quand la modale est ouverte, ajoute l'overlay et désactive le défilement du body
    document.body.style.overflow = 'hidden';
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    document.body.appendChild(overlay);

    // Quand la modale est fermée, enlève l'overlay et réactive le défilement du body
    overlay.addEventListener('click', () => {
        document.body.style.overflow = '';
        document.body.removeChild(overlay);
        galleryModal.style.display = 'none';
    });
}
