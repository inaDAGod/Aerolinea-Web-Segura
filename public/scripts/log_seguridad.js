
// scripts/log_seguridad.js

/**
 * Registra un evento de seguridad en el sistema
 * @param {string} tipoEvento - Tipo de evento (LOGIN_FALLIDO, USUARIO_INEXISTENTE, etc.)
 * @param {string} descripcion - Descripción detallada del evento
 * @param {string|null} correoUsuario - Correo del usuario relacionado (opcional)
 * @param {string} severidad - Nivel de severidad (INFO, ADVERTENCIA, ALTA, CRITICA)
 * @param {object} detallesAdicionales - Objeto con detalles adicionales
 */
async function registrarEventoSeguridad(tipoEvento, descripcion, correoUsuario = null, severidad = 'ADVERTENCIA', detallesAdicionales = {}) {
    try {
        // Obtener información del cliente
        const ip = await obtenerIP();
        const userAgent = navigator.userAgent;
        
        // Agregar detalles automáticos
        detallesAdicionales = {
            ...detallesAdicionales,
            navegador: navigator.appName,
            plataforma: navigator.platform,
            url: window.location.href
        };

        const datosLog = {
            tipo_evento: tipoEvento,
            descripcion: descripcion,
            correo_usuario: correoUsuario,
            ip_origen: ip,
            user_agent: userAgent,
            detalles_adicionales: detallesAdicionales,
            severidad: severidad
        };

        // Enviar al backend para registrar
        const respuesta = await fetch("http://localhost/Aerolinea-Web-Segura/backend/log/nuevo_log.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosLog)
        });

        if (!respuesta.ok) {
            console.error("Error al registrar evento de seguridad");
        }
    } catch (error) {
        console.error("Error en registrarEventoSeguridad:", error);
    }
}

/**
 * Intenta obtener la IP pública del usuario
 */
async function obtenerIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip || 'IP_NO_DISPONIBLE';
    } catch (error) {
        return 'IP_NO_DISPONIBLE';
    }
}

/**
 * Bloquear cuenta después de múltiples intentos fallidos
 */
function manejarBloqueoIntento(correo) {
    // Puedes implementar lógica adicional aquí, como:
    // - Enviar notificación al administrador
    // - Mostrar tiempo restante para nuevo intento
    // - Bloquear la cuenta en el backend
    // - pero como ya está eso en login mejor lo dejo así nomás
    
    registrarEventoSeguridad(
        'CUENTA_BLOQUEADA_TEMPORAL', 
        `Cuenta bloqueada temporalmente por múltiples intentos fallidos`, 
        correo, 
        'ALTA',
        { accion: 'BLOQUEO_TEMPORAL', duracion_minutos: 5 }
    );
    
    Swal.fire({
        title: 'Cuenta bloqueada',
        text: 'Demasiados intentos fallidos. Por seguridad, tu cuenta ha sido bloqueada temporalmente. Intenta nuevamente en 5 minutos.',
        icon: 'error',
        confirmButtonText: 'Entendido'
    });
}

/**
 * Obtiene los logs de seguridad desde el backend
 * @param {Object} filtros - Objeto con parámetros de filtrado (opcional)
 * @returns {Promise<Array>} - Lista de logs
 */
async function obtenerLogsSeguridad(filtros = {}) {
    try {
        // Construir query string desde los filtros
        const params = new URLSearchParams();
        
        // Añadir filtros si existen
        if (filtros.pagina) params.append('pagina', filtros.pagina);
        if (filtros.por_pagina) params.append('por_pagina', filtros.por_pagina);
        if (filtros.severidad) params.append('severidad', filtros.severidad);
        if (filtros.usuario) params.append('usuario', filtros.usuario);
        if (filtros.fecha_inicio) params.append('fecha_inicio', filtros.fecha_inicio);
        if (filtros.fecha_fin) params.append('fecha_fin', filtros.fecha_fin);
        
        const url = `http://localhost/Aerolinea-Web-Segura/backend/log/obtener_logs.php?${params.toString()}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.estado !== 'exito') {
            throw new Error(data.mensaje || 'Error al obtener logs');
        }
        
        return data;
        
    } catch (error) {
        console.error('Error en obtenerLogsSeguridad:', error);
        throw error; // Puedes manejar esto según tu flujo de aplicación
    }
}

async function obtenerLogsConMensaje(filtros = {}) {
    const loading = Swal.fire({
        title: 'Cargando logs',
        html: 'Por favor espere...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const data = await obtenerLogsSeguridad(filtros);
        
        await Swal.close();
        
        return data;
        
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los logs: ' + error.message
        });
        return { estado: 'error', datos: [] };
    }
}

// Variables globales
let datosActuales = {};
let filtrosActuales = {};

// Inicialización
$(document).ready(function() {
    cargarDatos();
    
    $('#filtrosForm').submit(function(e) {
        e.preventDefault();
        const formData = $(this).serializeArray();
        filtrosActuales = {};
        
        formData.forEach(item => {
            if (item.value) filtrosActuales[item.name] = item.value;
        });
        
        cargarDatos(filtrosActuales);
    });
});

async function cargarDatos(filtros = {}) {
    try {
        const data = await obtenerLogsConMensaje(filtros);
        
        if (data.estado === 'exito') {
            datosActuales = data;
            renderizarTabla(data.datos);
            renderizarPaginacion(data);
        }
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

function renderizarTabla(logs) {
    const $tbody = $('#cuerpoTabla');
    $tbody.empty();
    
    logs.forEach(log => {
        $tbody.append(`
            <tr class="severidad-${log.severidad.toLowerCase()}">
                <td>${log.id_log}</td>
                <td>${log.fecha_hora}</td>
                <td>${log.tipo_evento}</td>
                <td>${log.descripcion}</td>
                <td>${log.correo_usuario || 'N/A'}</td>
                <td><span class="badge bg-${getColorSeveridad(log.severidad)}">${log.severidad}</span></td>
            </tr>
        `);
    });
    
    // Inicializar DataTable (si lo usas)
    $('#tablaLogs').DataTable({
        responsive: true,
        destroy: true // Para reinicializar
    });
}

function getColorSeveridad(severidad) {
    const colores = {
        'INFO': 'info',
        'ADVERTENCIA': 'warning',
        'ALTA': 'danger',
        'CRITICA': 'dark'
    };
    return colores[severidad] || 'secondary';
}

function renderizarPaginacion(data) {
    const $paginacion = $('#paginacion');
    $paginacion.empty();
    
    const totalPaginas = data.total_paginas;
    const paginaActual = data.pagina_actual;
    
    // Botón Anterior
    $paginacion.append(`
        <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-pagina="${paginaActual - 1}">Anterior</a>
        </li>
    `);
    
    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
        $paginacion.append(`
            <li class="page-item ${i === paginaActual ? 'active' : ''}">
                <a class="page-link" href="#" data-pagina="${i}">${i}</a>
            </li>
        `);
    }
    
    // Botón Siguiente
    $paginacion.append(`
        <li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
            <a class="page-link" href="#" data-pagina="${paginaActual + 1}">Siguiente</a>
        </li>
    `);
    
    // Eventos de paginación
    $('.page-link').click(function(e) {
        e.preventDefault();
        const pagina = $(this).data('pagina');
        if (pagina >= 1 && pagina <= totalPaginas) {
            cargarDatos({ ...filtrosActuales, pagina });
        }
    });
}