import {initializeMap} from './loadMap.js';

const userID = localStorage.getItem('userID');
const imagenesSeleccionadas =[];
const PointerMap = {}
const map = initializeMap();
function addPingToMap() {
    var marker = null;
    function addMark(e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
        PointerMap.latitude = e.latlng.lat;
        PointerMap.longitude = e.latlng.lng;
    }
    map.on('click', addMark);
}

function guardarImagen(event) {
    const archivos = event.target.files;
    for (const archivo of archivos) {
        const urlImagen = URL.createObjectURL(archivo);
        imagenesSeleccionadas.push(urlImagen);
    }
}


document.getElementById('imageUpload').addEventListener('change', guardarImagen);
document.addEventListener('DOMContentLoaded', addPingToMap());
