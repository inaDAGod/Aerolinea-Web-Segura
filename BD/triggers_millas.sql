CREATE OR REPLACE FUNCTION aumentar_millas(correo_usuario_param varchar)
RETURNS void AS $$
BEGIN
    -- Incrementar las millas del usuario en 10
    UPDATE usuarios
    SET millas = millas + 10
    WHERE correo_usuario = correo_usuario_param;
END;
$$ LANGUAGE plpgsql;

--Para llamar al trigger aumentar_millas
--SELECT aumentar_millas('danialee14@gmail.com');
