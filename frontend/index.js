// formsUsers.js

function validarLogin() {
    const user = document.querySelector("#user").value;
    const pass = document.querySelector("#userPass").value;

    if (!user || !pass) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
        });
        return false;
    }

    if (pass.length < 6 || user.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Dato ingresado demasiado corto.',
        });
        return false;
    }

    return true;
}

function validarRegister() {
    const name = document.querySelector("#name").value;
    const apellido = document.querySelector("#apellido").value;
    const mail = document.querySelector("#mail").value;
    const clave = document.querySelector("#clave").value;

    if (!name || !apellido || !mail || !clave) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
        });
        return false;
    }

    if (name.length < 3 || mail.length < 3 || clave.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Dato ingresado demasiado corto.',
        });
        return false;
    }

    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#loginForm");
    const registerForm = document.querySelector("#registerForm");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (validarLogin()) {
            const user = document.querySelector("#user").value;
            const pass = document.querySelector("#userPass").value;

            try {
                const response = await axios.post('http://localhost:3000/api/users/login', {
                    user,
                    password: pass
                });

                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Exitoso',
                        text: 'Redirigiendo...',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        window.location.href = 'tours.html';  // Cambia esto a la ruta que quieras redirigir
                    });
                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al iniciar sesión',
                });
            }
        }
    });

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (validarRegister()) {
            const name = document.getElementById('name').value;
            const lastName = document.getElementById('apellido').value;
            const email = document.getElementById('mail').value;
            const password = document.getElementById('clave').value;

            try {
                const response = await axios.post('http://localhost:3000/api/users/register', {
                    name,
                    lastName,
                    email,
                    password
                });

                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro Exitoso',
                        text: 'Usuario registrado exitosamente!',
                    });
                }
            } catch (error) {
                console.error('Error registrando el usuario:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error registrando el usuario',
                });
            }
        }
    });
});
