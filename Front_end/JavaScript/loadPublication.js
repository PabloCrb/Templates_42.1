//localStorage.setItem("currentPublication","1"); //prueba
function initializeMap(latitude, longitude) {
    var map = L.map('map').setView([latitude, longitude], 13);
    var openstreetmap = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        });
    var openstreetmapHot = L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom: 20
        });
    var allOptions = {
        "Open streetmap": openstreetmap,
        "Open streetmap: Hot": openstreetmapHot,
    };
    L.control.layers(allOptions).addTo(map);
    openstreetmapHot.addTo(map);
    L.marker([latitude, longitude]).addTo(map);
    return map;
}

async function takeUrl(publicationID) {
    const response = await fetch("/Front_end/Prueba_carga_dinamica/publication.json")
        .then(async response => {
            if (!response.ok) {
                throw new Error("Fail to fetch document");
            }
            return await response.json();
        });
    const publication = response.Publication.find(pub => pub.id === publicationID);
    return publication ? publication.url : null;
}


async function loadElements(data) {
    document.getElementById("name").textContent = data.name;
    document.getElementById("description").textContent = data.description;
    const userName = await fetch("/Front_end/Prueba_carga_dinamica/Json/Users/" + data.user_id + ".json")
        .then(async response => {
            if (!response.ok) {
                throw new Error("Fail to fetch document");
            }
            return await response.json()
        });
    console.log(userName);
    document.getElementById("username").textContent = userName.user;

}

async function loadImages(image_list) {
    const listaImagenes = document.getElementById('ImageCarrusel');
    for (const imageUrl of image_list) {
        const nuevaImagen = document.createElement('img');
        nuevaImagen.src = imageUrl;
        listaImagenes.appendChild(nuevaImagen);
    }
}

async function initializePublication() {
    const url = await takeUrl(localStorage.getItem("currentPublication"));
    const response = await fetch(url)
        .then(async response => {
            if (!response.ok) {
                throw new Error("Fail to fetch document");
            }
            return await response.json()
        });
    loadElements(response);
    initializeMap(response.location[0], response.location[1]);
    await loadImages(response.image_list);

}