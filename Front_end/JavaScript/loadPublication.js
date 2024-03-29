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
    const response = await fetch("/Front_end/Datos/publication.json")
        .then(async response => {
            if (!response.ok) {
                throw new Error("Fail to fetch document");
            }
            return await response.json();
        });
    const publication = response.Publication.find(pub => pub.id === publicationID);
    return publication ? publication.url : null;
}
function createScore(valoration) {
    const valorationElement = document.getElementById("score");
    valorationElement.innerHTML = valoration;
    const valorationValue = parseFloat(valoration);
    const roundedValue = Math.floor(valorationValue);
    for (let i = 0; i < roundedValue; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.innerHTML = '&#9733;'; // Unicode de estrella
        valorationElement.appendChild(star);
    }
}
async function loadElements(data) {
    document.getElementById("name").textContent = data.name;
    createScore(data.score);
    document.getElementById("description").textContent = data.description;
    const user = await fetch("/Front_end/Datos/Json/Users/" + data.user_id + ".json")
        .then(async response => {
            if (!response.ok) {
                throw new Error("Fail to fetch document");
            }
            return await response.json()
        });
    document.getElementById("username").textContent = user.user;
    document.getElementById("photoUser").src = user.user_image;

}
async function loadImages(image_list) {
    const listaImagenes = document.getElementById('ImageCarrusel');
    for (const imageUrl of image_list) {
        const nuevaImagen = document.createElement('img');
        nuevaImagen.src = imageUrl;
        listaImagenes.appendChild(nuevaImagen);
    }
}
function createComment(userName, photoUser, text) {
    var comentariosDiv = document.getElementById('coments');
    var comentarioHTML = `
                <div class="comentario">
                    <div class="header-comment">
                        <img src="${photoUser}" class="imagen-comentario"> 
                        <h3 class="nombre">${userName}</h3>
                    </div>
                    <div class="mensaje">${text}</div>
                </div>
            `;
    comentariosDiv.innerHTML += comentarioHTML;
}
async function loadComment(comment_list) {
    for ( comment of comment_list){
        const response = await fetch(comment)
            .then(response =>{
                if (!response.ok){
                    throw new Error("Can not load comment");
                }
                return response.json();
            });
        const user = await fetch("/Front_end/Datos/Json/Users/" + response.user_id + ".json")
            .then(async response => {
                if (!response.ok) {
                    throw new Error("Fail to fetch document");
                }
                return await response.json()
            });
        var userName = user.user;
        var photoUser = user.user_image;
        var text = response.text;
        createComment(userName,photoUser,text);

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
    await loadComment(response.comment_list);

}