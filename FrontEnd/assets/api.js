export async function getAllData () {
    const request = await fetch('http://localhost:5678/api/works');
    const data = await request.json();

    return data;
}

export async function getAllCategories () {
    const request = await fetch('http://localhost:5678/api/categories');
    const data = await request.json();

    return data;
}

