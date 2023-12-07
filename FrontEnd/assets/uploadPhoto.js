// uploadPoto.js

const image = document.getElementById("up-photo");
const title = document.getElementById('titre');
const category = document.getElementById('dropdown');

image.addEventListener('change', inputCheck)
title.addEventListener('change', inputCheck)
category.addEventListener('change', inputCheck)

document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('valider');

    submitBtn.addEventListener('click', function () {

        // Assicurati che tutti i campi siano compilati prima di procedere
        if (title.value && category.value && image.files[0]) {
            // Crea un oggetto FormData per inviare i dati
            const formData = new FormData();
            formData.append('title', title.value);
            formData.append('category', category.value);
            formData.append('image', image.files[0]);

            // Effettua la richiesta al server
            uploadPhoto(formData);
        } else {
            // Avvisa l'utente che tutti i campi devono essere compilati
            alert('Compila tutti i campi prima di inviare.');
        }
    });
});

function inputCheck() {
    const valider = document.getElementById('valider');
    if (title.value && category.value && image.files[0]) {
        valider.style.backgroundColor = '#1D6154'
        valider.style.borderColor = '#1D6154'
    }
    else {
        valider.style.backgroundColor = '#A7A7A7'
        valider.style.borderColor = '#A7A7A7'
    }

}


async function uploadPhoto(formData) {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }

        // Rimuovi temporaneamente i dati dall'localStorage
        localStorage.removeItem('temporaryImage');

        // Vai alla pagina di gestione delle foto o fai qualche altra azione desiderata
        window.location.href = 'logged.html';
    } catch (error) {
        console.error('Si è verificato un problema con l\'operazione fetch:', error);
    }
}
