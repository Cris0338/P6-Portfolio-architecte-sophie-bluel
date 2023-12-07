// dropdownMenu.js

import { getAllData } from './api.js';
import { getAllCategories } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
  const dropdownSelect = document.getElementById('dropdown');

  // Aggiungi un'opzione vuota
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = '';
  dropdownSelect.appendChild(emptyOption);

  // Ottieni tutti i dati dall'API
  const categories = await getAllCategories();

    // Creazione dinamica degli elementi del dropdown menu
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    dropdownSelect.appendChild(option);
  });

});
