// dropdownMenu.js

import { getAllCategories } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
  const dropdownSelect = document.getElementById('dropdown');

  // Ajoute un ligne vide
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = '';
  dropdownSelect.appendChild(emptyOption);

  // Recupère les données API
  const categories = await getAllCategories();

    // Crée les elements du dropdown menu
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    dropdownSelect.appendChild(option);
  });

});
