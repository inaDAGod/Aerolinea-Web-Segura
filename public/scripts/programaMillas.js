function programaMillas(correoUsuario){
    fetch("http://localhost/SistemaWeb-Aerolinea/backend/programaMillas.php", {
        method: "POST",
        body: JSON.stringify({ correo: correoUsuario }),
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}
