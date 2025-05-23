// permissions.js

function verificarPermisos() {
    const rol = localStorage.getItem('rol');
    const accesos = localStorage.getItem('accesos') ? JSON.parse(localStorage.getItem('accesos')) : {};
    const tipo_usuario = localStorage.getItem('tipo_usuario');

    console.log('accesos:', accesos);
    console.log('tipo_usuario:', tipo_usuario);

    const paginaActual = window.location.pathname.split("/").pop();
    //console.log('pagina', paginaActual);
    if (!paginaActual) {
        paginaActual = "index.html";
    }

    const paginasPublicas = [
        "index.html",
        "catalogoVuelo.html",
        "verificarCheckin.html",
        "catalogoMillas.html",
        "opiniones.html",
        "registro.html"
    ];

    const paginasClienteNavbar = [
        "indexCliente.html",
        "catalogoVueloCliente.html",
        "verificarCheckinCliente.html",
        "catalogoMillasCliente.html",
        "opinionesCliente.html",
        "perfil.html"
    ];

    // <<< NUEVO >>> Páginas a las que cliente tiene permiso si está logueado
    const paginasClienteAccesibles = [
        ...paginasClienteNavbar,
        "reservar.html",
        "reservar2.html",
        "reservafinal.html",
        // agrega aquí todas las páginas internas a las que puede entrar el cliente logueado
    ];

    const mapaAccesos = {
        "Inicio": { href: "indexAdmi.html", texto: "Inicio" },
        "Agregar vuelos": { href: "infoVuelo.html", texto: "Vuelos" },
        "Modificar estado checkin": { href: "verificarCheckinAdmi.html", texto: "Check-In" },
        "Generar boleto": { href: "generarBoleto.html", texto: "Generar Boleto" },
        "ABM catalogo millas": { href: "catalogoMillasAdmi.html", texto: "Catálogo Premios Millas" },
        "Borrar opiniones": { href: "opinionesAdmin.html", texto: "Opiniones" },
        "ABM empleados": { href: "registroAdmi.html", texto: "ABM empleados" },
        "Ver Dashboard": { href: "dashboard.html", texto: "Dashboard" },
        "ABM Roles": { href: "roles.html", texto: "Roles" },
        "Auditoria de usuarios": { href: "admin_usuarios.html", texto: "Auditoría de Usuarios" },
        "Ver logs de aplicacion": { href: "auditoria_logs.html", texto: "Logs de Aplicación" },
        "Cerrar Sesion": { href: "index.html", texto: "Cerrar Sesion" },
        
    };

    const mapaPaginasPermisos = {
        "indexAdmi.html": "Inicio",
        "infoVuelo.html": "Agregar vuelos",
        "verificarCheckinAdmi.html": "Modificar estado checkin",
        "generarBoleto.html": "Generar boleto",
        "catalogoMillasAdmi.html": "ABM catalogo millas",
        "opinionesAdmin.html": "Borrar opiniones",
        "registroAdmi.html": "ABM empleados",
        "dashboard.html": "Ver Dashboard",
        "roles.html": "ABM Roles",
        "admin_usuarios.html": "Auditoria de usuarios",
        "auditoria_logs.html": "Ver logs de aplicacion",
        "admin_pasajeros.html": "Ver pasajeros",
        "reservasAdmin.html": "Ver Reservas",
        "addProducto.html" :  "ABM catalogo millas",
        "agregarRole.html" :  "ABM Roles",
        "agregarVuelo.html" :  "Agregar vuelos",
        "editarRole.html" :  "ABM Roles",
        "EditDeleteUsers.html": "ABM empleados",
        
    };

    if (!rol) {
        // No logueado
        if (!paginasPublicas.includes(paginaActual)) {
            mostrar404();
        } else {
            construirMenu('publico');
        }
    } else if (tipo_usuario === "cliente") {
        // Logueado como cliente
        if (!paginasClienteAccesibles.includes(paginaActual)) {
           if (!paginasPublicas.includes(paginaActual)) {
                mostrar404();
            } else {
                construirMenu('cliente');
            }
        } else {
            construirMenu('cliente');
        }
    } else if (tipo_usuario === "administrador") {
        // Logueado como admin
        if (paginaActual === "indexAdmi.html" || paginaActual === "index.html") {
            construirMenu('administrador', accesos, mapaAccesos);
            return;
        }

        const permisoNecesario = mapaPaginasPermisos[paginaActual];

        if (permisoNecesario) {
            if (accesos[permisoNecesario]) {
                construirMenu('administrador', accesos, mapaAccesos);
            } else {
                if (!paginasPublicas.includes(paginaActual)) {
                    mostrar404();
                } else {
                   construirMenu('administrador', accesos, mapaAccesos);
                }
            }
        } else {
            if (!paginasPublicas.includes(paginaActual)) {
                mostrar404();
            } else {
                construirMenu('administrador', accesos, mapaAccesos);
            }
        }
    } else {
        mostrar404();
    }
}

function construirMenu(tipo_usuario, accesos = {}, mapaAccesos = {}) {
    const nav = document.querySelector('.menu-navegacion');
    if (!nav) return;

    nav.innerHTML = '';

    if (tipo_usuario === 'publico') {
        const paginasPublicasMenu = [
            { href: "index.html", texto: "Inicio" },
            { href: "catalogoVuelo.html", texto: "Vuelos" },
            { href: "verificarCheckin.html", texto: "Check-In" },
            { href: "catalogoMillas.html", texto: "Catálogo Millas" },
            { href: "opiniones.html", texto: "Opiniones" },
            { href: "registro.html", texto: "Registro" }
        ];

        paginasPublicasMenu.forEach(pagina => {
            const link = document.createElement('a');
            link.href = pagina.href;
            link.textContent = pagina.texto;
            nav.appendChild(link);
        });

    } else if (tipo_usuario === 'cliente') {
        const paginasClienteMenu = [
            { href: "indexCliente.html", texto: "Inicio" },
            { href: "catalogoVueloCliente.html", texto: "Vuelos" },
            { href: "verificarCheckinCliente.html", texto: "Check-In" },
            { href: "catalogoMillasCliente.html", texto: "Catálogo Millas" },
            { href: "opinionesCliente.html", texto: "Opiniones" },
            { href: "perfil.html", texto: "Perfil" },
            { href: "#", texto: "Cerrar Sesion", onClick: cerrarSesion }
        ];

        paginasClienteMenu.forEach(pagina => {
            const link = document.createElement('a');
            link.href = pagina.href;
            link.textContent = pagina.texto;
            if (pagina.onClick) {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    pagina.onClick();
                });
            }
            nav.appendChild(link);
        });

    } else if (tipo_usuario === 'administrador') {
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
            linkCerrar.addEventListener('click', function (event) {
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

document.addEventListener('DOMContentLoaded', verificarPermisos);
