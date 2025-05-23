function programaMillas(correoUsuario){
    fetch(/backend/programaMillas.php", {
        method: "POST",
        body: JSON.stringify({ correo: correoUsuario }),
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}
