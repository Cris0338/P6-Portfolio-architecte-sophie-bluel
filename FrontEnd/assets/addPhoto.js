// Ottieni riferimenti agli elementi HTML
const uploadBtn = document.getElementById('up-photo');
const imageContainer = document.querySelector('.upload-img-container');
const inputFile = document.createElement('input');
inputFile.type = 'file';
inputFile.accept = 'image/jpeg, image/png';
inputFile.style.display = 'none';
imageContainer.appendChild(inputFile);

// Aggiungi un gestore di eventi al pulsante "Ajouter une photo" nella modale galleryModal
uploadBtn.addEventListener('click', (event) => {
    // Ferma la propagazione dell'evento click per evitare la chiusura della modale
    event.stopPropagation();

    // Mostra l'input di tipo file per aprire la finestra di esplora risorse
    inputFile.click();
});

// Aggiungi un gestore di eventi al cambio di selezione del file
inputFile.addEventListener('change', handleFileSelect);

function toggleUploadElements(show) {
    const faImage = document.querySelector('.fa-image');
    const uploadBtn = document.getElementById('up-photo');
    const infoParagraph = document.querySelector('.upload-img-container p');

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

    // Crea il quadratino nero
    const squareDiv = document.createElement('div');
    squareDiv.classList.add(`blackbox`);

    // Crea l'icona "trash" bianca
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid', 'fa-trash-alt', 'trash-icon', 'white-trash-icon');

    // Imposta le dimensioni dell'icona "trash"
    trashIcon.style.fontSize = '10px';

    // Aggiungi un evento di clic per eliminare l'immagine
    trashIcon.addEventListener('click', handleTrashClick);

    // Aggiungi l'icona "trash" nel quadratino nero
    squareDiv.appendChild(trashIcon);

    // Aggiungi il quadratino nero in alto a destra del contenitore
    uploadContainer.style.position = 'relative'; // Aggiunto per garantire che il posizionamento assoluto funzioni correttamente
    uploadContainer.appendChild(squareDiv);
}



function handleFileSelect() {
    const selectedFile = inputFile.files[0];

    if (selectedFile) {
        // Verifica il tipo del file e la dimensione
        const isValidFileType = ['image/jpeg', 'image/png'].includes(selectedFile.type);
        const isValidFileSize = selectedFile.size <= 4 * 1024 * 1024; // 4 MB in bytes

        if (isValidFileType && isValidFileSize) {
            // Nascondi il pulsante e il paragrafo
            toggleUploadElements(false);

            // Mostra l'icona "trash"
            showTrashIcon();

            // Mostra l'anteprima dell'immagine selezionata
            const imagePreview = document.createElement('img');
            imagePreview.src = URL.createObjectURL(selectedFile);
            imagePreview.alt = 'Selected Image';
            imageContainer.appendChild(imagePreview);

            // Salva la foto in locale (salvataggio provvisorio)
            const imageData = {
                src: imagePreview.src,
                alt: imagePreview.alt,
            };

            // Memorizza i dati dell'immagine nel localStorage
            localStorage.setItem('temporaryImage', JSON.stringify(imageData));

        } else {
            alert('Il formato o la dimensione del file non sono validi. Assicurati che sia un file JPEG o PNG e che non superi i 4 MB.');
        }
    }
}

function handleTrashClick(event) {
    // Rimuovi l'immagine preview
    const imageContainer = document.querySelector('.upload-img-container');
    imageContainer.removeChild(imageContainer.lastChild);

    // Mostra nuovamente il pulsante e il paragrafo
    toggleUploadElements(true);

    // Rimuovi l'icona "trash"
    const trashIcon = document.querySelector('.blackbox');
    trashIcon.parentNode.removeChild(trashIcon);

    event.stopPropagation();
}
