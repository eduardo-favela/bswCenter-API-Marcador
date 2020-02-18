const querys = require('../querys/campana');
const pool = require('../cnn/database');
const usuario = require('../helpers/usuario')


module.exports.getAllCampanas = async(datosUsuario) => {
    let allCampanas = await pool.query(querys.getAllCampanas, [datosUsuario.idUsuario]);
    let campanas = {};
    if (allCampanas.length < 2) {
        const tipousuario = await usuario.consultarPuesto(datosUsuario.idUsuario);
        if (tipousuario == "COORDINADOR" || tipousuario == "SUPERUSUARIO") {
            allCampanas = await pool.query(querys.getAllCampanasSpusr);
        }
    }
    campanas.in = allCampanas;
    return campanas;
}