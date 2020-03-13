const querys = require('../querys/llamadas');
const pool = require('../cnn/database');
const fs = require('fs');
const util = require('util');
var request = require('request');

module.exports.getAllColas = async (datos) => {
    const allColas = await pool.query(querys.getAllColas, []);
    var colas = {};
    return colas.colas = allColas;
}

module.exports.trasnferirLlamada = async (datos) => {
    let archivo = "/var/www/html/llamadaEscucha";
    const extensionEscucha = datos.extensionEscucha;
    const extensionAgente = datos.extensionAgente;
    const contexto = datos.contexto;
    fs.open(archivo, "w+", function (error, fd) {
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
                    fs.copyFile(archivo, `/var/spool/asterisk/outgoing/llamadaEscucha`, (err) => {
                        if (err) throw err;
                        return "Archivo escrito con exito";
                    });
            });
        }
    });

}


module.exports.realizarLlamada = async (datos) => {


    return "OK"

    let archivo = "/var/www/html/llamadaEscucha";
    let account = datos.campana + "." + datos.idCliente + "." + datos.extension;

    let infoArchivo = ``;
    if(datos.campanaMod == "PREDICTIVA"){
        infoArchivo = `${datos.channel}}
        Callerid:${datos.numeroFinal}
        WaitTime:30
        Maxretries:1
        RetryTime:100
        Extension:${datos.extension}
        Account:${account}
        Priority:1
        Context:from-internal`;
    }else{
        infoArchivo = `Channel:SIP/${datos.extension}
        Callerid:${datos.numero}
        WaitTime:30
        Maxretries:0
        RetryTime:0
        Extension:${datos.numeroFinal}
        Account:${account}
        Priority:1
        Context:from-internal`;
    }
    fs.open = util.promisify(fs.open)
    fs.copyFile = util.promisify(fs.copyFile)
    fs.writeFile = util.promisify(fs.writeFile)
    let leerFile = await fs.open(archivo, "w+");

    if(leerFile.error) {
        return leerFile.error.message;
    }else {
        let escribirFile = await fs.writeFile(archivo, infoArchivo);
        if (escribirFile.error) {
            return escribirFile.error.message;
        } else {
            let copiarFile = fs.copyFile(archivo, `/var/spool/asterisk/outgoing/llamadaEscucha`);
            if (copiarFile.error) {
                return copiarFile.error.message;
            }else{
                return "OK";
            }
        }
    }





}