// api.js

// Fonction asynchrone pour récupérer toutes les données
export async function getAllData () {
    // Effectue une requête à l'API pour obtenir les "works"
    const request = await fetch('http://localhost:5678/api/works');
    // Attend la réponse de la requête sous forme de JSON
    const data = await request.json();

    // Retourne les données obtenues
    return data;
}

// Fonction asynchrone pour récupérer toutes les catégories
export async function getAllCategories () {
    // Effectue une requête à l'API pour obtenir les catégories
    const request = await fetch('http://localhost:5678/api/categories');
    // Attend la réponse de la requête sous forme de JSON
    const data = await request.json();

    // Retourne les données obtenues
    return data;
}
