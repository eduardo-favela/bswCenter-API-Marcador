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
    let archivo = "/var/www/html/llamadaEscucha";
    const extensionEscucha = datos.extensionEscucha;
    const extensionAgente = datos.extensionAgente;
    const contexto = datos.contexto;
    /* if (archivo == false) {
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
    } */
    // Cerrar el archivo:
    /*     fclose(archivo);

        output = retval = NULL;
        exec("cp /var/www/html/llamadaEscucha /var/spool/asterisk/outgoing/llamadaEscucha"); */
    fs.open(archivo, "w+", function(error, fd) {
        if (error) {
            return error.message;
        } else {
            fs.writeFile(archivo,
                `Channel:SIP/${extensionEscucha}
Callerid:${extensionAgente}
WaitTime:30
Maxretries:1
RetryTime:100
Extension:555
Account:
Priority:1
Set:SPYNUM=${extensionAgente}
Context:${contexto}`,
                (err) => {
                    if (err) throw err;
                    fs.copyFile(archivo, `/var/www/html/llamadaEscucha2`, (err) => {
                        if (err) throw err;
                        return "Archivo escrito con exito";
                    });
                });
        }
    });

}