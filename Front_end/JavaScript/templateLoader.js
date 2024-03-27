function cargarTemplate(url, selector, callback = null) {
    fetch(url)
        .then(response => {
            return response.text();
        })
        .then(data => {
            let container = document.querySelector(selector);
            container.innerHTML = data;
            if (callback) {
                callback();
            }
        })
        .catch(error => {
            console.error('Error al cargar el template:', error);
        });
}


