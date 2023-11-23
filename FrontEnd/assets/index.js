// import { getAllData } from "./api.js";

// const project = await getAllData();
// console.log(project);


        // Importdes données API
        import { getAllData } from "./api.js";

        // creation du tableau
        let allProjects = [];

        // Tableau catégories
        const desiredCategories = ['Objets', 'Appartements', 'Hotels & restaurants'];

        // Fonction d'ajout image e titre a la gallerie
        function renderProjects(projects) {
            const gallery = document.querySelector('.gallery');
            gallery.innerHTML = '';

            projects.forEach(project => {
                // Creation image
                const projectElement = document.createElement('figure');

                const imgElement = document.createElement('img');
                imgElement.src = project.imageUrl;
                imgElement.alt = project.title;

                // Creation titre
                const titleElement = document.createElement('figcaption');
                titleElement.textContent = project.title;

                // Ajout img e titre
                projectElement.appendChild(imgElement);
                projectElement.appendChild(titleElement);

                // Ajout img a la gallerie
                gallery.appendChild(projectElement);
            });
        }

        // Function pour créer les boutons des filtres
        function createFilterButtons() {
            const filterButtonsContainer = document.querySelector('.filter-buttons');

            // Ajout btn "tous"
            const allButton = document.createElement('button');
            allButton.textContent = 'Tous';
            allButton.onclick = () => filterProjects('all', allButton);
            filterButtonsContainer.appendChild(allButton);

            // Ajout btns categories
            desiredCategories.forEach(categoryName => {
                const categoryButton = document.createElement('button');
                categoryButton.textContent = categoryName;
                categoryButton.onclick = () => filterProjects(categoryName, categoryButton);
                filterButtonsContainer.appendChild(categoryButton);
            });
        }

        // Function filtre
        function filterProjects(categoryName, button) {
            // Enlever la classe "active" et ajouter "non-active"
            document.querySelectorAll('.filter-buttons button').forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('non-active');
            });

            // Ajouter la classe "active" enlever "non-active" seulement bouton selectionné
            button.classList.add('active');
            button.classList.remove('non-active');

            if (categoryName === 'all') {
                renderProjects(allProjects); //montre tous
            } else {
                const filteredProjects = allProjects.filter(project => project.category.name === categoryName);
                renderProjects(filteredProjects); // montre seulement la cat selectionnée
            }
        }

        // Fonction qui charge le tout
        async function loadProjects() {
            try {
                allProjects = await getAllData();

                createFilterButtons();
                renderProjects(allProjects);
            } catch (error) {
                console.error('Erreur dans le chargement des projets:', error);
            }
        }

        // Appel à la fonction
        loadProjects();