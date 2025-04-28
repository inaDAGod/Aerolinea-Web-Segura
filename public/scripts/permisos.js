document.addEventListener('DOMContentLoaded', function() {
    validarPermisosYNavbar();
    protegerPagina();
});

function validarPermisosYNavbar() {
    const rol = localStorage.getItem('rol');

    // No cargues el navbar si no hay rol (visitante público)
    if (!rol) return; 

    fetch('http://localhost/Aerolinea-Web-Segura/backend/fetch_roles.php')
        .then(response => response.json())
        .then(data => {
            const rolInfo = data.find(r => r.rol === rol);

            if (!rolInfo) {
                Swal.fire('Error', 'No tienes permisos válidos', 'error')
                    .then(() => {
                        window.location.href = 'index.html';
                    });
                return;
            }

            const accesos = rolInfo.accesos;
            localStorage.setItem('accesos', JSON.stringify(accesos));
            cargarNavbar(accesos);
        })
        .catch(error => {
            console.error('Error al cargar permisos:', error);
            Swal.fire('Error', 'Problema de permisos', 'error');
        });
}

function cargarNavbar(accesos) {
    const menu = document.querySelector('.menu-navegacion');
    if (!menu) return;

    menu.innerHTML = '';

    if (accesos.inicio) {
        menu.innerHTML += '<a href="indexAdmi.html">Inicio</a>';
    }
    if (accesos.vuelos) {
        menu.innerHTML += '<a href="infoVuelo.html">Vuelos</a>';
    }
    if (accesos.checkin) {
        menu.innerHTML += '<a href="verificarCheckinAdmi.html">Check-In</a>';
    }
    if (accesos.generarBoleto) {
        menu.innerHTML += '<a href="generarBoleto.html">Generar Boleto</a>';
    }
    if (accesos.catalogoMillas) {
        menu.innerHTML += '<a href="catalogoMillasAdmi.html">Catálogo Premios millas</a>';
    }
    if (accesos.opiniones) {
        menu.innerHTML += '<a href="opinionesAdmin.html">Opiniones</a>';
    }
    if (accesos.registrarAdministrador) {
        menu.innerHTML += '<a href="registroAdmi.html">Registrar administrador</a>';
    }
    if (accesos.dashboard) {
        menu.innerHTML += '<a href="dashboard.html">Dashboard</a>';
    }

    menu.innerHTML += '<a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>';
}

function protegerPagina() {
    const paginasLibres = ['index.html', 'registroCliente.html', 'otraPaginaPublica.html']; 
    // Agrega aquí las páginas públicas

    const paginaActual = window.location.pathname.split('/').pop();

    // Si la página es pública, no hay que protegerla
    if (paginasLibres.includes(paginaActual)) {
        return;
    }

    const rol = localStorage.getItem('rol');
    const accesosGuardados = localStorage.getItem('accesos');

    if (!rol || !accesosGuardados) {
        Swal.fire('Acceso denegado', 'Debes iniciar sesión para entrar aquí.', 'error')
            .then(() => {
                window.location.href = 'index.html';
            });
        return;
    }

    const accesos = JSON.parse(accesosGuardados);

    const mapaPaginas = {
        'infoVuelo.html': 'vuelos',
        'verificarCheckinAdmi.html': 'checkin',
        'generarBoleto.html': 'generarBoleto',
        'catalogoMillasAdmi.html': 'catalogoMillas',
        'opinionesAdmin.html': 'opiniones',
        'registroAdmi.html': 'registrarAdministrador',
        'dashboard.html': 'dashboard'
    };

    const permisoNecesario = mapaPaginas[paginaActual];

    if (permisoNecesario && !accesos[permisoNecesario]) {
        Swal.fire('Acceso denegado', 'No tienes permiso para entrar aquí.', 'error') //cmabiarlo que use el error 404 de not found
            .then(() => {
                window.location.href = 'index.html';
            });
    }
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = 'index.html';
}
