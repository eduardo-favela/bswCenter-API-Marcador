const querys = require('../querys/llamadas');
const pool = require('../cnn/database');
const { exec } = require("child_process");
const fs = require('fs');

module.exports.getAllColas = async(datos) => {
    const allColas = await pool.query(querys.getAllColas, []);
    var colas = {};
    return colas.colas = allColas;
}

module.exports.trasnferirLlamada = async(datos) => {
    /* let extesionEscucha = REQUEST('extesionEscucha');
    let extesionAgente = REQUEST('extesionAgente');
    let contexto = REQUEST('contexto');
    let archivo = fopen("/var/www/html/llamadaEscucha", "w+b");
    if (archivo == false) {
        return "Error al crear el archivo";
    } else {
        // Escribir en el archivo:
        fwrite(archivo, "Channel:SIP/" + extesionEscucha);
        fwrite(archivo, "\r\n");
        fwrite(archivo, "Callerid:" + extesionAgente);
        fwrite(archivo, "\r\n");
        fwrite(archivo, "WaitTime:30");
        fwrite(archivo, "\r\n");
        fwrite(archivo, "Maxretries:1");
        fwrite(archivo, "\r\n");
        fwrite(archivo, "RetryTime:100");
        fwrite(archivo, "\r\n");
        fwrite(archivo, "Extension:555");
        fwrite(archivo, "\r\n");
        fwrite(archivo, "Account:");
        fwrite(archivo, "\r\n");
        fwrite(archivo, "Priority:1");
        fwrite(archivo, "\r\n");
        fwrite(archivo, "Set:SPYNUM=" + extesionAgente);
        fwrite(archivo, "\r\n");
        fwrite(archivo, "Context:" + contexto);
        // Fuerza a que se escriban los datos pendientes en el buffer:
        fflush(archivo);
    }
    // Cerrar el archivo:
    fclose(archivo);

    output = retval = NULL;
    exec("cp /var/www/html/llamadaEscucha /var/spool/asterisk/outgoing/llamadaEscucha"); */
    let archivo = fs.open("/var/www/html/llamadaEscucha", "w+", function(error, fd) {
        if (error) {
            console.log(error.message);
            return error.message;
        } else {
            console.log(archivo);
            return archivo;
        }
    });

}