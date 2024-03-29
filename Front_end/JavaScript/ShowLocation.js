import {initializeMap} from './loadMap.js';
const map = initializeMap();

async function takeFiles() {
    const  response = await fetch("/Front_end/Datos/publication.json")
        .then(response =>{
            if(!response.ok){
                throw new Error('No se pudo obtener informacion');
            }
            return response.json();
        });
    return response;
}

async function loadAllPublication() {
    const files = await takeFiles();
    const publications = [];
    for(const file of files.Publication){
        const response = await fetch(file.url)
            .then(response =>{
            if(!response.ok){
                throw new Error('No se pudo obtener informacion');
            }
            return response.json();
        });
        publications.push(response);
    }
    return publications;
}

async function paintMap() {
    const publications = await loadAllPublication();
    for (const publication of publications) {
        let location = [];
        const ubicacion = publication.location;
        location.push(ubicacion[0]);
        location.push(ubicacion[1]);
        const marker = L.marker(location, {
            id: publication.location_id,
            name: publication.name
        }).addTo(map);
        marker.on('click', function (e){
            localStorage.setItem('currentPublication',e.target.options.id);
            window.location.href = "../Publication/publication.html"
        });
        marker.bindTooltip(publication.name);
        marker.on('mouseover', function(e) {
            marker.openTooltip(); // Abre el tooltip cuando el ratón se coloca sobre el marcador
        });
        marker.on('mouseout', function(e) {
            marker.closeTooltip(); // Cierra el tooltip cuando el ratón sale del marcador
        });
    }
}

document.addEventListener('DOMContentLoaded', paintMap());