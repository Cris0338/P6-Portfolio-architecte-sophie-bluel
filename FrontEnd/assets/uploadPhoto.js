// uploadPhoto.js
document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('valider');

    submitBtn.addEventListener('click', function () {
        // Ottieni i dati dall'localStorage
        const imageData = JSON.parse(localStorage.getItem('temporaryImage'));
        const titleInput = document.getElementById('titre').value;
        const categorySelect = document.getElementById('dropdown');
        const selectedCategory = categorySelect.options[categorySelect.selectedIndex].value;

        // Assicurati che tutti i campi siano compilati prima di procedere
        if (imageData && titleInput && selectedCategory) {
            // Crea un oggetto FormData per inviare i dati
            const formData = new FormData();
            formData.append('image', imageData);
            formData.append('title', titleInput);
            formData.append('category', selectedCategory);

            // Effettua la richiesta al server
            uploadPhoto(formData);
        } else {
            // Avvisa l'utente che tutti i campi devono essere compilati
            alert('Compila tutti i campi prima di inviare.');
        }
    });
});

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
