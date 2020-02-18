const querys = require('../querys/opcionesproceso');
const pool = require('../cnn/database');

module.exports.consultarOpcPrc = async() => {
    const opcPrc = await pool.query(querys.consultarOpcPrc, []);
    return opcPrc;
}