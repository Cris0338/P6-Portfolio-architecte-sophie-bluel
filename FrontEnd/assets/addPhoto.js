// addPhoto.js

// Références aux éléments HTML
const upfile = document.getElementById('up-photo');
const imageContainer = document.querySelector('.upload-img-container');
const uploadBtn = document.querySelector('.btn-up-photo');

// Ajoute un gestionnaire d'événements pour le changement de sélection de fichier
upfile.addEventListener('change', handleFileSelect);

export function toggleUploadElements(show) {
    const faImage = document.querySelector('.fa-image');
    const infoParagraph = document.querySelector('.upload-img-container p');

    // Si show est vrai, affiche les éléments, sinon cache-les
    if (show) {
        faImage.style.display = 'block';
        uploadBtn.style.display = 'block';
        infoParagraph.style.display = 'block';
    } else {
        faImage.style.display = 'none';
        uploadBtn.style.display = 'none';
        infoParagraph.style.display = 'none';
    }
}

function showTrashIcon() {
    const uploadContainer = document.querySelector('.upload-img-container');

    // Crée le carré noir
    const squareDiv = document.createElement('div');
    squareDiv.classList.add(`blackbox`);
// 
    squareDiv.setAttribute('id', 'trashIcon');
    // Crée l'icône corbeille blanche
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid', 'fa-trash-alt', 'trash-icon', 'white-trash-icon');

    // Définis la taille de l'icône corbeille
    trashIcon.style.fontSize = '10px';

    // Ajoute un événement click pour supprimer l'image
    trashIcon.addEventListener('click', handleTrashClick);

    

    // Ajoute l'icône "corbeille" dans le carré noir
    squareDiv.appendChild(trashIcon);

    // Ajoute le carré noir en haut à droite du conteneur
    uploadContainer.style.position = 'relative'; // Ajouté pour garantir que le positionnement absolu fonctionne correctement
    uploadContainer.appendChild(squareDiv);

}

function handleFileSelect() {
    const selectedFile = upfile.files[0];

    // Si un fichier est sélectionné
    if (selectedFile) {
        // Vérifie le type de fichier et la taille
        const isValidFileType = ['image/jpeg', 'image/png'].includes(selectedFile.type);
        const isValidFileSize = selectedFile.size <= 4 * 1024 * 1024; // 4 Mo en octets

        // Si le type de fichier et la taille sont valides
        if (isValidFileType && isValidFileSize) {
            // Cache le bouton et le paragraphe
            toggleUploadElements(false);

            // Affiche l'icône corbeille
            showTrashIcon();

            // Affiche un aperçu de l'image sélectionnée
            const imagePreview = document.createElement('img');
            imagePreview.src = URL.createObjectURL(selectedFile);
            imagePreview.alt = 'Selected Image';
            imagePreview.setAttribute('id', 'selected-image');
            imageContainer.appendChild(imagePreview);

            // Enregistre la photo localement (enregistrement temporaire)
            const imageData = {
                src: imagePreview.src,
                alt: imagePreview.alt,
            };

            // Stock les données de l'image dans le sessionStorage
            sessionStorage.setItem('temporaryImage', JSON.stringify(imageData));

        } else {
            alert('Le format ou la taille du fichier ne sont pas valides. Assurez-vous qu\'il s\'agit d\'un fichier JPEG ou PNG et qu\'il ne dépasse pas 4 Mo.');
        }
    }
}

function handleTrashClick() {
    // Supprime l'aperçu de l'image
    const imageContainer = document.querySelector('.upload-img-container');
    imageContainer.removeChild(imageContainer.lastChild);

    // Affiche à nouveau le bouton et le paragraphe
    toggleUploadElements(true);

    // Supprime l'icône corbeille
    const trashIcon = document.querySelector('.blackbox');
    trashIcon.parentNode.removeChild(trashIcon);
}
