
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