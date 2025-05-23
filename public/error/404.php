<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self';");
http_response_code(404);
?>
<!DOCTYPE html>
<html>
<head><title>Error 404 - No encontrado</title></head>
<body>
  <h1>404 - Página no encontrada</h1>
</body>
</html>
