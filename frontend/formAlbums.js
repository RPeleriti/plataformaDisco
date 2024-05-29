document.getElementById('songForm').addEventListener('submit', addSong);
document.getElementById('verTodos').addEventListener('click', viewSongs);

let favoritos = [];

function addSong(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('disco', document.getElementById('disco').value);
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('duracion', document.getElementById('duracion').value);
    formData.append('lanzamiento', document.getElementById('lanzamiento').value);
    formData.append('portada', document.getElementById('portada').files[0]);

    axios.post('http://localhost:3000/cancion', formData)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
            // Limpiar el formulario después de agregar la canción
            document.getElementById('songForm').reset();
            viewSongs(); // Actualizar la lista de canciones
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al agregar la canción'
            });
            console.error('Error al agregar la canción:', error);
        });
}

function viewSongs() {
    axios.get('http://localhost:3000/canciones')
        .then(response => {
            const canciones = response.data;
            const listaCanciones = document.getElementById('lista-canciones');
            listaCanciones.innerHTML = '';
            canciones.forEach(cancion => {
                const cancionElement = document.createElement('div');
                cancionElement.classList.add('bg-gray-600', 'p-4', 'rounded', 'relative');
                cancionElement.innerHTML = `
                    <p><strong>Disco:</strong> ${cancion.disco}</p>
                    <p><strong>Título:</strong> ${cancion.titulo}</p>
                    <p><strong>Duración:</strong> ${cancion.duracion}</p>
                    <p><strong>Lanzamiento:</strong> ${new Date(cancion.lanzamiento).toLocaleDateString()}</p>
                    ${cancion.portada ? `<img src="http://localhost:3000/${cancion.portada}" alt="Portada" class="w-32 h-32 object-cover mb-2">` : ''}
                    <button onclick="editSong('${cancion._id}')" class="bg-yellow-500 text-white px-2 py-1 rounded mt-2">Editar</button>
                    <button onclick="deleteSong('${cancion._id}')" class="bg-red-500 text-white px-2 py-1 rounded mt-2 ml-2">Eliminar</button>
                    <i class="fas fa-star absolute top-2 right-2 text-white cursor-pointer ${favoritos.includes(cancion._id) ? 'text-yellow-500' : ''}" onclick="toggleFavorito('${cancion._id}')"></i>
                `;
                listaCanciones.appendChild(cancionElement);
            });
        })
        .catch(error => {
            console.error('Error al cargar las canciones:', error);
        });
}

function editSong(id) {
    const disco = prompt('Nuevo disco:');
    const titulo = prompt('Nuevo título:');
    const duracion = prompt('Nueva duración:');
    const lanzamiento = prompt('Nueva fecha de lanzamiento:');
    const formData = new FormData();
    formData.append('disco', disco);
    formData.append('titulo', titulo);
    formData.append('duracion', duracion);
    formData.append('lanzamiento', lanzamiento);
    const portadaFile = document.getElementById('portada').files[0];
    if (portadaFile) {
        formData.append('portada', portadaFile);
    }

    axios.put(`http://localhost:3000/cancion/${id}`, formData)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
            viewSongs();
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al actualizar la canción'
            });
            console.error('Error al actualizar la canción:', error);
        });
}

function deleteSong(id) {
    if (confirm('¿Está seguro de que desea eliminar esta canción?')) {
        axios.delete(`http://localhost:3000/cancion/${id}`)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                viewSongs();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al eliminar la canción'
                });
                console.error('Error al eliminar la canción:', error);
            });
    }
}

function toggleFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(favorito => favorito !== id);
    } else {
        favoritos.push(id);
    }
    viewSongs(); // Actualizar la vista para reflejar los cambios
}
