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

    if (pass.length < 6|| user.length < 3) {
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
    const mail= document.querySelector("#mail").value;
    const clave=document.querySelector("#clave").value;

    if (!name || !apellido|| !mail|| !clave) {
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

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("#loginForm");
    const registerForm = document.querySelector("#registerForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        if (validarLogin()) {
            this.submit(); 
        }
    });

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        
        if (validarRegister()) {
            this.submit(); 
        }
    });
});
