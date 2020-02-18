const querys = require('../querys/canales');
const pool = require('../cnn/database');
const util = require('util');

module.exports.consultar = async(datos) => {
    const consulta = await pool.query(querys.consultarCanales, [datos.idUsuario]);

    if(consulta.length > 0){
        let canales = consulta[0].canales;
        canales = canales.replace("12", "T");
        canales = canales.replace("11", "F");
        canales = canales.replace("8", "W");
        canales = canales.replace("7", "CH");
        canales = canales.replace("4", "M");
        canales = canales.replace("1", "I");
        let canales_ = canales.split(',');

        return canales_;

    }else{

        return [];
    }
}
