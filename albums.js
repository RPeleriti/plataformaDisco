
const albumContainers = document.querySelectorAll('.portadas');
const favoritos = [];

albumContainers.forEach(function(container, index) {
    // Crear el elemento de icono de estrella
    const starIcon = document.createElement('i');

    // Agregar las clases necesarias al icono de estrella
    starIcon.classList.add("fa-solid", "fa-star", 'absolute', 'text-gray-300');
    starIcon.style.fontSize = '60px';

    // Agregar un identificador único al icono de estrella
    starIcon.id = `star${index + 1}`;

    // Insertar el icono de estrella dentro del contenedor de la portada del álbum
    container.prepend(starIcon);

    // Agregar evento de clic a cada ícono de estrella
    starIcon.addEventListener('click', function() {
        starIcon.classList.toggle('text-yellow-500');

        const albumTitle = container.querySelector('img').alt;

        // Verificar si el álbum ya está en favoritos
        if (favoritos.includes(albumTitle)) {
            Swal.fire({
                icon: 'info',
                title: '¡Atención!',
                text: 'Este álbum ya no esta en tus favoritos.',
            });
            return;
        }

        // Agregar el álbum a la lista de favoritos
        favoritos.push(albumTitle);

        Swal.fire({
            icon: 'success',
            title: '¡Álbum agregado a favoritos!',
            text: `${albumTitle} se ha agregado a tus favoritos.`,
        });
    });
});
