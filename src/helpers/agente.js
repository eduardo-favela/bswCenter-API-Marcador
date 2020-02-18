const querys = require('../querys/agente.js');
const pool = require('../cnn/database');
const usuario = require('../helpers/usuario')
const querySupervisor = require('../querys/supervisor.js');

const util = require('util');

module.exports.getAllEstatus = async() => {
    const allEstatus = await pool.query(querys.getAllEstatus, []);
    const estatusRes = await pool.query(querys.getEstatusRes, []);
    const Estatus = {};
    Estatus.agente = allEstatus,
        Estatus.receso = estatusRes;
    return Estatus
}

//Informacion del agente
module.exports.consultarAgentes = async(datos) => {
    const supervisor = await pool.query(querySupervisor.consultarSupervisorPorId, [datos.ID]);
    const tipousuario = await usuario.consultarPuesto(supervisor[0].supervisor);
    let campana = datos.campana;
    let cola = datos.cola;
    let ID = datos.ID;
    let sts = datos.sts;
    let stsres = datos.stsres;
    let canalCon = datos.canalCon;
    let agentesActivos = datos.agentesActivos;
    let canal_inicial = datos.canal_inicial;

    if (ID == '' || tipousuario == "COORDINADOR" || tipousuario == "SUPERUSUARIO") {
        const agentesInb = await pool.query(querys.consultarAgentesAll, [campana, cola, '', sts, stsres, agentesActivos]);
        const agentesOut = await pool.query(querys.consultarAgentesOutAll, [campana, '', sts, stsres, agentesActivos]);
        const agentes = {};
        if (canalCon == 1) {
            agentes.in = agentesInb
            agentes.out = {}
            return agentes;
        } else if (canalCon == 2) {
            agentes.in = {}
            agentes.out = agentesOut
            return agentes;
        } else if (canalCon == 0) {
            agentes.in = agentesInb
            agentes.out = agentesOut
            return agentes;
        }
    } else {
        const agentesInb = await pool.query(querys.consultarAgentes, [campana, cola, ID, sts, stsres, agentesActivos]);
        const agentesOut = await pool.query(querys.consultarAgentesOut, [campana, ID, sts, stsres, agentesActivos]);
        const agentes = {};
        if (canalCon == 1) {
            agentes.in = agentesInb
            agentes.out = {}
            return agentes;
        } else if (canalCon == 2) {
            agentes.in = {}
            agentes.out = agentesOut
            return agentes;
        } else if (canalCon == 0) {
            agentes.in = agentesInb
            agentes.out = agentesOut
            return agentes;
        }
    }
}

module.exports.consultarDatosAgente = async(idUsuario) => {

        let datosAgente = {

            datos1: await pool.query(querys.consultarDatosAgente, [idUsuario]),
            datos2: await pool.query(querys.consultarDatosAgente2, [idUsuario]),
            areas: await pool.query(querys.consultarAreas, [idUsuario]),

        }

        return datosAgente

    }
    //consultar agentes 
module.exports.consultarIdnAgentes = async(agentesActivos) => {
    const retorno = {}
    const idnAgnts = await pool.query(querys.consultarIdnAgnts, [agentesActivos]);
    return retorno.idnAgnts = idnAgnts;
}



module.exports.consultarIdnAgentes = async(agentesActivos) => {
    const retorno = {}
    const idnAgnts = await pool.query(querys.consultarIdnAgnts, [agentesActivos]);
    return retorno.idnAgnts = idnAgnts;
}



module.exports.consultarTotalInteracciones = async() => {

    const interacciones = await pool.query(querys.consultarTotalInteracciones, []);
    return interacciones.length > 0 ? interacciones[0].total : 0;
}

module.exports.consultarInteracciones = async(canal, idAgente) => {

    console.log(canal)
    var recordset = {};
    var facebook = {};
    var whatsapp = {};
    var chat = {};
    var tw = {};

    const resultado = await pool.query(querys.consultarInteracciones, [idAgente]);
    recordset.interacciones = resultado;

    canales = canal.split(",");

    for (var i = 0; i < canales.length; i++) {

        if (canales[i] == "F") {

            const resultado2 = await pool.query(querys.consultarNoVistosChatFB, [idAgente]);
            facebook.noVistos = resultado2;

            const resultado3 = await pool.query(querys.consultarUltimoMensajeChatFB, [idAgente]);
            facebook.ultimosMensajes = resultado3;

            recordset.F = facebook;

        } else if (canales[i] == "W") {

            const resultado4 = await pool.query(querys.consultarNoVistosChatWTS, [idAgente]);
            whatsapp.noVistos = resultado4;

            const resultado5 = await pool.query(querys.consultarUltimoMensajeChatWTS, [idAgente]);
            whatsapp.ultimosMensajes = resultado5;

            recordset.W = whatsapp;



        } else if (canales[i] == "CH") {

            const resultado9 = await pool.query(querys.consultarNoVistosChat, [idAgente]);
            chat.noVistos = resultado9;

            const resultado8 = await pool.query(querys.consultarUltimoMensajeChat, [idAgente]);
            chat.ultimosMensajes = resultado8;

            recordset.CH = chat;
        } else if (canales[i] = "T") {
            const resultado5 = await pool.query(querys.consultarNoVistosChatTW, [idAgente]);
            tw.noVistos = resultado5;

            const resultado6 = await pool.query(querys.consultarUltimoMensajeChatTW, [idAgente]);
            tw.ultimosMensajes = resultado6;

            recordset.T = tw;
        }
    }


    return recordset;

}


module.exports.contarTotalMensajes = async(idUsuario) => {

    let totales = {

        facebook: JSON.parse(JSON.stringify(await pool.query(querys.totalMsjFB, [])))[0].totalMsj,
        whatsapp: JSON.parse(JSON.stringify(await pool.query(querys.totalMsjWTS, [])))[0].totalMsj,
        twitter: JSON.parse(JSON.stringify(await pool.query(querys.totalMsjTW, [])))[0].totalMsj,
        chat: JSON.parse(JSON.stringify(await pool.query(querys.totalMsjCH, [])))[0].totalMsj,
    }
    return totales

}


module.exports.cambiarEstatusNuevo = async (idInteraccion) => {

    await pool.query(querys.cambiarEstatusNuevo, [idInteraccion])
    return "OK"

}


module.exports.consultarOpcPrc = async () => {

    let opcProceso = await pool.query(querys.consultarOpcPrc, [])
    let opcionesProceso = {};
    await opcProceso.forEach((opc)=> {
        opcionesProceso[opc.nombre] = opc.valor;
    })
    return opcionesProceso;

}