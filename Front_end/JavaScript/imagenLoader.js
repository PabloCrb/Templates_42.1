function addImage(imagenPath, texto) {
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
    let contenedor = document.getElementById("imagenContainer");
    contenedor.appendChild(nuevoElemento);
}

 async function loadUserDirectory(url) {
    const userID = localStorage.getItem("userName");

    if (!userID) {
        console.error('User name not found in localStorage.');
        return Promise.reject('User name not found in localStorage.');
    }

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const filteredUser = data["Users"].filter(user => user.userName === userID);
            if (filteredUser.length === 1) {
                return filteredUser[0];
            } else {
                throw new Error('User not found or multiple users found with the same ID.');
            }
        })
        .then(data => {
            return data["directory"];
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

async function getUserPublicationsIDs(url, fieldName) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const publicationList = data[fieldName];
            return publicationList.map(publication => publication.publication_id);
        });
}

async function getPublicationURL(id) {
    return fetch("/Front_end/Prueba_carga_dinamica/publication.JSON")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const publications = data["Publication"];
            if (id >= 1 && id <= publications.length) {
                const index = id - 1;
                return publications[index].url;
            } else {
                throw new Error('Publication ID out of range');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

async function loadPublicationField(url, fieldName) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data[fieldName];
        })
        .then(data => {
            return (fieldName === "name") ? data : data[0];
        });
}

(async () => {
    localStorage.setItem("userName", "maria@maria.es");
    const directory = await loadUserDirectory("prueba_user.JSON");
    const publication_id = await getUserPublicationsIDs(directory, "my_publication_list");

    for (const id of publication_id) {
        const publication_url = await getPublicationURL(id);
        const imagen = await loadPublicationField(publication_url, "image_list");
        const name = await loadPublicationField(publication_url, "name");
        addImage(imagen, name);
        }
})();
