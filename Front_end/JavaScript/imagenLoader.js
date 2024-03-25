function addImage(contenedor, imagenPath, texto) {
    let nuevoElemento = document.createElement('div');
    nuevoElemento.className = 'imagewd';
    nuevoElemento.style.width = '350px';
    nuevoElemento.style.height = '350px';
    nuevoElemento.style.position = 'relative';
    nuevoElemento.style.backgroundImage = `url('${imagenPath}')`;
    nuevoElemento.style.backgroundSize = 'cover';
    nuevoElemento.style.backgroundPosition = 'center';
    nuevoElemento.style.cursor = 'pointer';
    nuevoElemento.style.border = '2px solid black'

    let textoElemento = document.createElement('div');
    textoElemento.innerHTML = texto;
    textoElemento.style.position = 'absolute';
    textoElemento.style.bottom = '0';
    textoElemento.style.color = 'white';
    textoElemento.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    textoElemento.style.padding = '5px';
    textoElemento.style.display = 'none';
    textoElemento.style.width = '97.5%'

    nuevoElemento.addEventListener('mouseover', function() {
        textoElemento.style.display = 'block';
    });

    nuevoElemento.addEventListener('mouseout', function() {
        textoElemento.style.display = 'none';
    });

    nuevoElemento.appendChild(textoElemento);
    contenedor.appendChild(nuevoElemento);
}

function cargarImagenes() {
    const contenedorImagenes = document.getElementById('imagenContainer');
    const imagenesYTextos = [
        { imagenPath: '../Images/prueba1.jpg', texto: 'Estadio de Las Palmas de Gran Canaria'},
        { imagenPath: '../Images/prueba2.jpg', texto: 'Casa de Colón'},
        { imagenPath: '../Images/prueba3.jpg', texto: 'Roque Bentaiga'},
        { imagenPath: '../Images/prueba4.jpg', texto: 'Presa de las niñas'},
        { imagenPath: '../Images/prueba5.jpg', texto: 'Club náutico de Las Palmas de G.C'},
        { imagenPath: '../Images/prueba6.jpg', texto: 'Barranco de Azuaje'}
    ];

    imagenesYTextos.forEach(item => {
        addImage(contenedorImagenes, item.imagenPath, item.texto);
    });
}