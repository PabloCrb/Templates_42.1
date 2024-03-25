document.addEventListener("DOMContentLoaded", function(){
    fetch("/Front_end/Prueba_carga_dinamica/Json/publication/p1.json")
        .then(response => response.json())
        .then(data => {
            /* --- Name & Description --- */
            document.getElementById("name").textContent = data.name;
            document.getElementById("description").textContent = data.description;

            /* --- Username --- */
            const userId = data.user_id;
            const userJson = userId + ".json";
            fetch("/Front_end/Prueba_carga_dinamica/Json/Users/" + userJson)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("username").textContent = data.user;
                })
                .catch(error => console.error("Error al cargar el nombre de usuario:", error));

            /* --- Comments --- */
            const commentsUl = document.getElementById("comments");
            commentsUl.innerHTML = "";
            data.comment_list.forEach(commentUrl => {
                fetch(commentUrl)
                    .then(response => response.json())
                    .then(commentData => {
                        const li = document.createElement("li");
                        li.textContent = commentData.text;
                        commentsUl.appendChild(li);
                    })
                    .catch(error => console.error("Error al cargar los comentarios:", error));
            });

            /* --- Images --- */
            const imageContainer = document.querySelector('.image-carousel-container');
            imageContainer.innerHTML = '';
            data.image_list.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = "Imagen";
                imageContainer.appendChild(img);
            });
            // Crear botón izquierdo del carrusel
            const leftButton = document.createElement('div');
            leftButton.className = 'carousel-button left';
            leftButton.textContent = '❮';
            leftButton.onclick = function() {
                moveCarousel(-1);
            };

            // Crear botón derecho del carrusel
            const rightButton = document.createElement('div');
            rightButton.className = 'carousel-button right';
            rightButton.textContent = '❯';
            rightButton.onclick = function() {
                moveCarousel(1);
            };

            // Agregar los botones al contenedor del carrusel
            imageContainer.appendChild(leftButton);
            imageContainer.appendChild(rightButton);

        })
        .catch(error => console.error("Error al cargar la publicación:", error));
});