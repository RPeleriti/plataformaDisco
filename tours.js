
function obtenerNombre() {
    let nombre = prompt("¿Cual es tu nombre?");
    let nombreIcon = "fa-solid fa-ticket fa-7x";
    const span = document.querySelector("#welcome");
    const info = document.getElementById("info");
    if (nombre.length < 2) {
        alert("El nombre es demasiado corto. Por favor, ingresá un nombre válido.");
        return;
    }
    let edad = prompt("¿Cuántos años tienes?");
    edad = parseInt(edad);
    if (isNaN(edad) || edad <= 0) {
        alert("Por favor, ingresa una edad válida.");
        return;
    }
    if (edad > 18) {
        let icono = document.createElement("i");
        icono.className = "fa " + nombreIcon;
        span.textContent = "Hola, " + nombre + ". Te informamos lugar y fechas disponibles de los shows ";
        span.appendChild(icono);
        info.style.display = "flex";

    } else {
        span.textContent = "Hola, " + nombre + ". No tienes la edad suficiente para comprar entradas. Lo siento!";
        deshabilitarBotones();
    }
}
// Función para deshabilitar botones
function deshabilitarBotones() {
    let botonesComprar = document.querySelectorAll('.comprar');
    botonesComprar.forEach(function (boton) {
        boton.disabled = true;
        boton.classList.remove('comprar');
        boton.classList.add('desactivado');
        boton.textContent = "Disabled";
    });
}
// Función para manejar la compra de entradas
function manejarCompra() {
    let botonesComprar = document.querySelectorAll('.comprar');
    botonesComprar.forEach(function (boton) {
        boton.addEventListener("click", function () {
            let banda = boton.dataset.banda;
            let ciudad = boton.dataset.ciudad;
            let entradasDisponibles = parseInt(boton.dataset.entradas);
            if (entradasDisponibles > 0) {
                entradasDisponibles--;

                for (let i = 0; i < bandas.length; i++) {
                    if (bandas[i].nombre === banda && bandas[i].ciudad === ciudad) {
                        bandas[i].entradas = entradasDisponibles;
                        break;
                    }
                }

                // Actualiza los datos del botón
                boton.dataset.entradas = entradasDisponibles;
                // Muestra un mensaje de confirmación
                swal("¡Compra realizada!", "Has comprado una entrada para " + banda + " en " + ciudad + ". Entradas disponibles: " + entradasDisponibles, "success");

            } else {
                // Muestra un mensaje de alerta si no hay entradas disponibles
                swal("¡Lo sentimos!", "No hay más entradas disponibles para " + banda + " en " + ciudad, "warning");
                boton.textContent = "Agotado";
                boton.disabled = true;
            }
        });
    });
}

let bandas = [
    {
        nombre: "Ataque 77",
        ciudad: "La Plata",
        entradas: 4
    },
    {
        nombre: "2 minutos",
        ciudad: "Rosario",
        entradas: 3
    },
    {
        nombre: "The Ramonos",
        ciudad: "Bariloche",
        entradas: 2
    }
];
// Llamada a las funciones al cargar la página
window.onload = function () {
    obtenerNombre();
    manejarCompra();
};
