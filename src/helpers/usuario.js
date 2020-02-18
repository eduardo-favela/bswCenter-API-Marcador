const querys = require('../querys/usuario');
const pool = require('../cnn/database');
const util = require('util');


module.exports.login = async(datosUsuario) => {

    const keysUser = await pool.query(querys.consultaKeysUser, [datosUsuario.idUsuario]);
    const retorno = {};
    if (keysUser.length > 0) {
        var keys = keysUser[0];
        if (keys.SSUSRPSW == "") {
            retorno.valido = false;
            retorno.mensaje = "El usuario " + datosUsuario.idUsuario + " no existe";
        } else {
            let key = "Espartacus2019bswcenter" + keys.SSUSRID.trim();
            var url = 'https://crm3.bsw.mx:8080/P8821/P821' + "?psw=" + datosUsuario.pssw + "&llave=" + key + "&pswdb=" + keys.SSUSRPSW;
            var request = require('request');
            request = util.promisify(request);
            var validar = await request(url);
            if (validar.error) {
                retorno.valido = false;
                retorno.mensaje = "Ocurrio un error al validar el usuario";
            } else {
                if (validar.body == "true") {
                    retorno.valido = true;
                    retorno.mensaje = "Bienvenido!!";
                    retorno.idUsuario = keys.SSUSRID;
                    retorno.puesto = await consultarPuesto(keys.SSUSRID)
                    retorno.nombreusuario = keys.SSUSRDSC;
                } else {
                    retorno.valido = false;
                    retorno.mensaje = "Contraseña no valida";
                }
            }
        }
    } else {
        retorno.valido = false;
        retorno.mensaje = "Usuario no existe";
    }
    return retorno;
}

async function consultarPuesto(idUsuario) {
    var puesto = "";
    if (idUsuario == "SPUSRM") {
        return puesto = "SUPERUSUARIO"
    } else {
        const agtInb = await pool.query(querys.consultarAgtInb, [idUsuario]);
        if (agtInb.length > 0) {
            puesto = "AGENTE_INBOUND"
            return puesto;
        } else {
            const agtOut = await pool.query(querys.consultarAgtOut, [idUsuario]);
            if (agtOut.length > 0) {
                puesto = "AGENTE_OUTBOUND"
                return puesto;
            } else {
                const sup = await pool.query(querys.consultarSup, [idUsuario]);
                if (sup.length > 0) {
                    if (sup[0].canal == "1") {
                        puesto = "SUPERVISOR_INBOUND"
                        return puesto;
                    } else if (sup[0].canal == "2") {
                        puesto = "SUPERVISOR_OUTBOUND"
                        return puesto;
                    }
                } else {
                    const coord = await pool.query(querys.consultarCoord, [idUsuario]);
                    if (coord.length > 0) {
                        puesto = "COORDINADOR"
                        return puesto;
                    }
                }
            }
        }
    }
}

module.exports.consultarPuesto = async(idUsuario) => { return consultarPuesto(idUsuario) }

module.exports.userinfo = async(datosUsuario) => {
    var userinfo = await pool.query(querys.userinfo, [datosUsuario.idUsuario]);
    const retorno = {};
    if (userinfo.length > 0) {
        retorno.valido = true;
        retorno.userinfo = userinfo;
    } else {
        retorno.valido = false;
        retorno.mensaje = "Usuario no existe";
    }
    return retorno;
}

module.exports.consultarNombre = async(idUsuario) => {
    const usuario = await pool.query(querys.nombreUsuario, [idUsuario]);
    return usuario;
}

module.exports.registroInicioSesion = async(usuario) => {
    let userLogin = { fechaFin: '' };
    if (usuario.puesto == "AGENTE_OUTBOUND" || usuario.puesto == "AGENTE_INBOUND") {
        var dispAgt = await pool.query(querys.consultarDisponibilidadAgente, [usuario.idUsuario.trim()]);
        if (dispAgt.length > 0) { userLogin.fechaFin = dispAgt[0].BTMPERSONALFFIN }
        if (userLogin.fechaFin != null) {
            var receso = await pool.query(querys.Estaenreceso, [usuario.idUsuario]);
            userLogin.estReceso = receso.length == 0 ? "DIS" : receso[0].sts;
            if (userLogin.estReceso != "RES") {
                var idMax = await pool.query(querys.calcularIdbtmpersonal, [usuario.idUsuario.trim()]);
                await pool.query(querys.insertarMovimientos, [idMax[0].id, usuario.idUsuario.trim()]);
                await pool.query(querys.actulizarAgenteOutbound, ["DISPONIBLE", "S", usuario.idUsuario.trim()]);
                await pool.query(querys.actulizarAgenteInbound, ["DISPONIBLE", "S", usuario.idUsuario.trim()]);
                await pool.query(querys.updateMovimientosRecesoUsuario, [usuario.idUsuario.trim()]);
                await pool.query(querys.actulizarRecesos, [usuario.idUsuario.trim()]);
                userLogin.valor = "LOGIN_OK"
                return userLogin;

            } else if (receso[0].sts == "RES") {
                const infoRec = await pool.query(querys.infoReceso, [usuario.idUsuario.trim()]);
                if (infoRec[0].esHoy == "NO") {
                    userLogin.valor = "RECESO_VENCIDO"
                    return userLogin;
                } else {
                    userLogin.dscReceso = infoRec[0].BTCRECESONOMC;
                    userLogin.horaReceso = infoRec[0].BTMPERSONALHINI;
                    userLogin.valor = "RECESO_ACTUAL"
                    return userLogin;
                }
            }

        } else {
            userLogin.valor = "USUARIO_LOGUEADO"
            return userLogin;
        }
    } else {
        userLogin.valor = "USUARIO_NO_AGENTE"
        return userLogin;
    }
}

module.exports.terminarSesiones = async (idUsuario) => {
    await pool.query(querys.updateSesiones, [idUsuario.trim(), "SBSC", ]);
    return "OK";
}

module.exports.terminarRecesos = async (idUsuario) => {
    await pool.query(querys.updateRecesos_, [idUsuario.trim()]);
    await pool.query(querys.updateRecesos, ["DIS", idUsuario.trim()]);
    return "OK";
}

module.exports.cerrarSesion = async (idUsuario) => {

    var receso=await pool.query(querys.Estaenreceso, [idUsuario]); 
    var estReceso = receso.length == 0 ? "DIS" : receso[0].sts;
    if(estReceso != "RES"){
        await pool.query(querys.cerrarSesion, [idUsuario]);   
        await pool.query(querys.updateMovimientosUsuario, [idUsuario]);  
        const max = await pool.query(querys.calcularIdmonacH, []);  
        await pool.query(querys.InsertarSesionTrabajoHistorial, [max[0].id, idUsuario,"","2",""]); 
        await pool.query(querys.actulizarAgenteOutbound, ["NO DISPONIBLE","N", idUsuario]);
        await pool.query(querys.actulizarAgenteInbound, ["NO DISPONIBLE","N", idUsuario]);        
    }
    return "OK"
}



