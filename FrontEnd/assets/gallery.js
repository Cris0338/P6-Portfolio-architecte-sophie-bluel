import { getAllData } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
    const galleryContainer = document.querySelector('.gallery');

    // Ottieni tutti i dati dall'API
    const data = await getAllData();

    // Creazione dinamica degli elementi della galleria
    data.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.dataset.category = item.category.name; // Aggiungi l'attributo data-category

        const image = document.createElement('img');
        image.src = item.imageUrl;
        image.alt = item.title;

        const title = document.createElement('h3');
        title.textContent = item.title;

        galleryItem.appendChild(image);
        galleryItem.appendChild(title);

        galleryContainer.appendChild(galleryItem);
    });
});

export function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const shouldShow = category === 'Tous' || item.dataset.category === category;
        item.style.display = shouldShow ? 'block' : 'none';
    });
}
