const querys = require('../querys/supervisor');
const pool = require('../cnn/database');


module.exports.consultarSupervisores = async(usuario) => {
    let idUsuario = usuario.idUsuario;
    const supervisores = {}
    const allSupervisores = await pool.query(querys.consultarSupervisores, [idUsuario]);
    if (allSupervisores.length == 0) {
        const all = await pool.query(querys.consultarSupervisoresOut, [idUsuario]);
        supervisores.all = all;
        supervisores.canal = "O"
        if (all.length == 0) {
            //const coordinador = await pool.query(querys.coordinadores, [idUsuario])
            //if (coordinador.length > 0) {
            const Tsupervisores = await pool.query(querys.consultarSupervisoresAll, [])
            supervisores.all = Tsupervisores;
            supervisores.canal = "O/I"
            return supervisores;
            //} else {

            //}
        } else {
            return supervisores;
        }
    } else {
        supervisores.all = allSupervisores;
        supervisores.canal = "I"
        return supervisores;
    }
}