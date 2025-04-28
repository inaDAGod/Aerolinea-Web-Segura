// permissions.js

function verificarPermisos() {
    const rol = localStorage.getItem('rol');
    const accesos = localStorage.getItem('accesos') ? JSON.parse(localStorage.getItem('accesos')) : {};  // Asegúrate de que accesos sea un objeto
    console.log('accesos:', accesos);  // Verifica que los accesos estén correctamente cargados
    
    const tipoUsuario = localStorage.getItem('tipoUsuario'); // "administrador" o "cliente"

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
    } else if (rol === "cliente") {
        // Usuario cliente
        if (!paginasCliente.includes(paginaActual)) {
            window.location.href = "indexCliente.html";
        }
    } else if (rol !== "cliente") {
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
        construirMenuAdmin(accesos, mapaAccesos);
    } else {
        // Rol desconocido
        mostrar404();
    }
}

function construirMenuAdmin(accesos, mapaAccesos) {
    const nav = document.querySelector('.menu-navegacion');

    if (!nav) return; // Si no existe el menú en la página, salir.

    nav.innerHTML = ''; // Limpiar menú actual.

    // Siempre agregar "Inicio"
    if (mapaAccesos["Inicio"]) {
        const linkInicio = document.createElement('a');
        linkInicio.href = mapaAccesos["Inicio"].href;
        linkInicio.textContent = mapaAccesos["Inicio"].texto;
        nav.appendChild(linkInicio);
    }

    Object.entries(accesos).forEach(([acceso, permitido]) => {
        if (permitido && mapaAccesos[acceso]) {
            console.log(`Acceso permitido: ${acceso}`); // Ver qué accesos están siendo agregados
            const link = document.createElement('a');
            link.href = mapaAccesos[acceso].href;
            link.textContent = mapaAccesos[acceso].texto;
            nav.appendChild(link);
        }
    });
    
    

    // Siempre agregar "Cerrar Sesión"
    if (mapaAccesos["Cerrar Sesion"]) {
        const linkCerrar = document.createElement('a');
        linkCerrar.href = mapaAccesos["Cerrar Sesion"].href;
        linkCerrar.textContent = mapaAccesos["Cerrar Sesion"].texto;
        nav.appendChild(linkCerrar);
    }
}



function mostrar404() {
    document.body.innerHTML = `
        <div style="text-align: center; padding: 100px;">
            <h1 style="font-size: 80px;">404</h1>
            <p style="font-size: 24px;">Página no encontrada o acceso no autorizado</p>
            <a href="index.html" style="font-size: 20px; color: blue;">Volver al inicio</a>
        </div>
    `;
    document.title = "404 No Encontrado";
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "index.html";
}

// Ejecutar verificación automáticamente
document.addEventListener('DOMContentLoaded', verificarPermisos);
