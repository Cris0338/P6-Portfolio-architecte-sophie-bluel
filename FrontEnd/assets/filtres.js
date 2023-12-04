import { getAllData } from './api.js';
import { filterGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', async function () {
    const filtersContainer = document.querySelector('.filtres');

    // Ottieni tutti i dati dall'API per identificare le categorie
    const data = await getAllData();
    const categories = Array.from(new Set(data.map(item => item.category.name)));

    // Aggiungi il pulsante "All" alla fine dell'elemento esistente
    const allButton = createFilterButton('Tous');
    allButton.addEventListener('click', () => handleFilterClick(allButton, 'Tous'));
    filtersContainer.appendChild(allButton);

    // Aggiungi i pulsanti per ogni categoria esistente
    categories.forEach(category => {
        const categoryButton = createFilterButton(category);
        categoryButton.addEventListener('click', () => handleFilterClick(categoryButton, category));
        filtersContainer.appendChild(categoryButton);
    });

    // Imposta il pulsante "Tous" come attivo all'avvio della pagina
    allButton.classList.add('active');
});

function createFilterButton(category) {
    const button = document.createElement('button');
    button.textContent = category;
    return button;
}

function handleFilterClick(clickedButton, category) {
    // Rimuovi la classe 'active' da tutti i pulsanti
    const allButtons = document.querySelectorAll('.filtres button');
    allButtons.forEach(button => button.classList.remove('active'));

    // Aggiungi la classe 'active' al pulsante cliccato
    clickedButton.classList.add('active');

    // Chiamata alla funzione filterGallery con la categoria selezionata
    filterGallery(category);
}

