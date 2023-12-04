import { getAllData } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
  const dropdownSelect = document.getElementById('dropdown');

  // Aggiungi un'opzione vuota
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = '';
  dropdownSelect.appendChild(emptyOption);

  // Ottieni tutti i dati dall'API
  const data = await getAllData();

  // Ottieni dinamicamente tutte le categorie dalla risposta dell'API
  const categories = [...new Set(data.map(item => item.category.name))];

  // Creazione dinamica degli elementi del dropdown menu
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    dropdownSelect.appendChild(option);
  });

  // Impedisci la propagazione del click al di fuori del menu a discesa
  dropdownSelect.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});
