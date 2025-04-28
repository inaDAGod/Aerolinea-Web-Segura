// permissions.js

function verificarPermisos() {
    const rol = localStorage.getItem('rol');
    const accesos = localStorage.getItem('accesos') ? JSON.parse(localStorage.getItem('accesos')) : {};  // Asegúrate de que accesos sea un objeto
    const tipo_usuario = localStorage.getItem('tipo_usuario'); // "administrador" o "cliente"
    console.log('accesos:', accesos);  // Verifica que los accesos estén correctamente cargados
    console.log('tipo_usuario:', tipo_usuario);  // Verifica el tipo de usuario

    const paginaActual = window.location.pathname.split("/").pop(); // Ejemplo: "dashboard.html"

    const paginasPublicas = [
        "index.html",
        "catalogoVuelo.html",
        "verificarCheckin.html",
        "catalogoMillas.html",
        "opiniones.html",
        "registro.html"
    ];

    const paginasCliente = [
        "indexCliente.html",
        "catalogoVueloCliente.html",
        "verificarCheckinCliente.html",
        "catalogoMillasCliente.html",
        "opinionesCliente.html",
        "perfil.html",
        "index.html" // Cerrar sesión
    ];

    const mapaAccesos = {
        "Inicio": { href: "indexAdmi.html", texto: "Inicio" },
        "Agregar vuelos": { href: "infoVuelo.html", texto: "Vuelos" },
        "Modificar estado checkin": { href: "verificarCheckinAdmi.html", texto: "Check-In" },
        "Generar boleto": { href: "generarBoleto.html", texto: "Generar Boleto" },
        "ABM catalogo millas": { href: "catalogoMillasAdmi.html", texto: "Catálogo Premios Millas" },
        "Borrar opiniones": { href: "opinionesAdmin.html", texto: "Opiniones" },
        "ABM empleados": { href: "registroAdmi.html", texto: "Registrar Administrador" },
        "Ver Dashboard": { href: "dashboard.html", texto: "Dashboard" },
        "ABM Roles": { href: "roles.html", texto: "Roles" },
        "Auditoria de usuarios": { href: "admin_usuarios.html", texto: "Auditoría de Usuarios" },
        "Ver pasajeros": { href: "admin_pasajeros.html", texto: "Ver Pasajeros" },
        "Ver Reservas": { href: "reservasAdmin.html", texto: "Ver Reservas" },
        "Modificar estado reservas": { href: "reservasAdmin.html", texto: "Modificar Estado Reservas" },
        "Cerrar Sesion": { href: "index.html", texto: "Cerrar Sesión" }
    };

    if (!rol) {
        // Usuario no logueado
        if (!paginasPublicas.includes(paginaActual)) {
            mostrar404();
        }
    } else if (tipo_usuario === "cliente") {
        // Usuario cliente
        if (!paginasCliente.includes(paginaActual)) {
            window.location.href = "indexCliente.html";
        }
        construirMenu('cliente');  // Llamada para construir el menú cliente
    } else if (tipo_usuario === "administrador") {
        // Usuario administrador
        const paginasBaseAdmin = ["indexAdmi.html", "index.html"]; // Siempre Inicio y Cerrar sesión
        const paginasPermitidas = [...paginasBaseAdmin];

        Object.entries(accesos).forEach(([acceso, permitido]) => {
            if (permitido && mapaAccesos[acceso]) {
                paginasPermitidas.push(mapaAccesos[acceso].href);
            }
        });

        if (!paginasPermitidas.includes(paginaActual)) {
            window.location.href = "indexAdmi.html";
        }

        // Construir el menú
        construirMenu('administrador', accesos, mapaAccesos);
    } else {
        // Rol desconocido
        mostrar404();
    }
}

function construirMenu(tipo_usuario, accesos, mapaAccesos) {
    const nav = document.querySelector('.menu-navegacion');
    if (!nav) return;

    nav.innerHTML = '';

    if (tipo_usuario === 'cliente') {
        const paginasClienteMenu = [
            { href: "indexCliente.html", texto: "Inicio" },
            { href: "catalogoVueloCliente.html", texto: "Vuelos" },
            { href: "verificarCheckinCliente.html", texto: "Check-In" },
            { href: "catalogoMillasCliente.html", texto: "Catálogo Millas" },
            { href: "opinionesCliente.html", texto: "Opiniones" },
            { href: "perfil.html", texto: "Perfil" },
            { href: "#", texto: "Cerrar Sesión", onClick: cerrarSesion }
        ];

        paginasClienteMenu.forEach(pagina => {
            const link = document.createElement('a');
            link.href = pagina.href;
            link.textContent = pagina.texto;
            if (pagina.onClick) {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    pagina.onClick();
                });
            }
            nav.appendChild(link);
        });

    } else if (tipo_usuario === 'administrador') {
        // Inicio
        if (mapaAccesos["Inicio"]) {
            const linkInicio = document.createElement('a');
            linkInicio.href = mapaAccesos["Inicio"].href;
            linkInicio.textContent = mapaAccesos["Inicio"].texto;
            nav.appendChild(linkInicio);
        }

        Object.entries(accesos).forEach(([acceso, permitido]) => {
            if (permitido && mapaAccesos[acceso]) {
                const link = document.createElement('a');
                link.href = mapaAccesos[acceso].href;
                link.textContent = mapaAccesos[acceso].texto;
                nav.appendChild(link);
            }
        });

        if (mapaAccesos["Cerrar Sesion"]) {
            const linkCerrar = document.createElement('a');
            linkCerrar.href = "#";
            linkCerrar.textContent = mapaAccesos["Cerrar Sesion"].texto;
            linkCerrar.addEventListener('click', function(event) {
                event.preventDefault();
                cerrarSesion();
            });
            nav.appendChild(linkCerrar);
        }
    }
}

function mostrar404() {
    window.location.href = "/404";
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "index.html";
}

// Ejecutar verificación automáticamente
document.addEventListener('DOMContentLoaded', verificarPermisos);
