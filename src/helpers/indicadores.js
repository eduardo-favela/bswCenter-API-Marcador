const querys = require('../querys/indicadores.js');
const querysAgente = require('../querys/agente.js');
const pool = require('../cnn/database');
const usuario = require('../helpers/usuario')
const querySupervisor = require('../querys/supervisor.js');


//Indicadores
module.exports.conIndicadores = async(campana, cola, ID, sts, stsres, canalCon, canal_inicial, agentesActivos) => {
    const supervisor = await pool.query(querySupervisor.consultarSupervisorPorId, [ID]);
    const tipousuario = await usuario.consultarPuesto(supervisor[0].supervisor);
    if (ID == '' || tipousuario == "COORDINADOR" || tipousuario == "SUPERUSUARIO") {
        const conIndicadores = await pool.query(querys.conIndicadoresAll, [campana, cola, '', sts, stsres, agentesActivos]);
        const supervisorOut = await pool.query(querysAgente.consultarAgentesOutAll, [campana, '', sts, stsres, agentesActivos]);
        const arr_indicadores = {};
        if (canalCon == 1) {
            arr_indicadores.in = conIndicadores;
            arr_indicadores.out = {}
            return arr_indicadores;
        } else if (canalCon == 2) {
            arr_indicadores.in = 0
            arr_indicadores.out = supervisorOut;
            return arr_indicadores;
        } else if (canalCon == 0) {
            arr_indicadores.in = conIndicadores;
            arr_indicadores.out = supervisorOut;
            return arr_indicadores;
        }
    } else {
        const conIndicadores = await pool.query(querys.conIndicadores, [campana, cola, ID, sts, stsres, agentesActivos]);
        const supervisorOut = await pool.query(querysAgente.consultarAgentesOut, [campana, ID, sts, stsres, agentesActivos]);
        const arr_indicadores = {};
        if (canalCon == 1) {
            arr_indicadores.in = conIndicadores;
            arr_indicadores.out = {}
            return arr_indicadores;
        } else if (canalCon == 2) {
            arr_indicadores.in = 0
            arr_indicadores.out = supervisorOut;
            return arr_indicadores;
        } else if (canalCon == 0) {
            arr_indicadores.in = conIndicadores;
            arr_indicadores.out = supervisorOut;
            return arr_indicadores;
        }
    }
}