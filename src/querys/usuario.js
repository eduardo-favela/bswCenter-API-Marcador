module.exports.consultaKeysUser = `SELECT a.SSUSRID, a.SSUSRDSC, a.SSUSRPSW, a.SSUSRKEY 
    FROM siogen01.ssusri a 
    INNER JOIN siogen01.cnuser b  ON b.CNUSERID = a.SSUSRID 
    WHERE a.SSUSRID = ? `;

module.exports.userinfo = `SELECT CNUSERID usuarioId, CONCAT(CNUSERPNOM,' ',CNUSERAPELLP) nombreusuario FROM siogen01.cnuser WHERE CNUSERID=?;`;

module.exports.nombreUsuario = `SELECT A.SSUSRDSC nombreusuario FROM siogen01.ssusri A 
    INNER JOIN siogen01.CNUSER B ON B.CNUSERID = A.SSUSRID 
    LEFT JOIN siogen01.SMSUSER C ON B.SMSUSERID = C.SMSUSERID 
    WHERE A.SSUSRID = ?`;

module.exports.consultarDisponibilidadAgente = `select BTMPERSONALFFIN from 
    bstntrn.btmpersonal where BTCRECESONOMC = 'SESION SC' and SIOusuarioId = ? order by BTMPERSONALIDN desc LIMIT 1; `;

module.exports.Estaenreceso = `SELECT BTESTAGNTT sts FROM bstntrn.btestagnt where  BTESTAGNTUSR = ? and BTESTAGNTMOTIVOID != 'FJLA'`;

module.exports.calcularIdbtmpersonal = `SELECT COALESCE(MAX(btmpersonalIDN)+1,1) AS id FROM bstntrn.btmpersonal;`;

module.exports.insertarMovimientos = `INSERT INTO bstntrn.btmpersonal (btmpersonalIDN, SIOusuarioId, btmpersonalRECID, btmpersonalFINI,btmpersonalHINI,BTCRECESONOMC) 
    VALUES (?,?,'SBSC', CURDATE(),current_time(),'SESION SC')`;

module.exports.actulizarAgenteOutbound = `UPDATE bstntrn.btagenteoutbound SET btagenteOutStsExt = ?,btAgenteOutSesion = ? WHERE btAgenteOutId = ?;`;

module.exports.actulizarAgenteInbound = `UPDATE bstntrn.btagenteinbound SET btagenteInbtStsExt = ?,btAgenteInbSesion = ?  WHERE btAgenteInbId = ? ;`;

module.exports.updateMovimientosRecesoUsuario = `UPDATE  bstntrn.btmpersonal 
     SET btmpersonalDURS= FLOOR(TIME_TO_SEC(TIMEDIFF(current_time(), BTMPERSONALHINI))), 
     btmpersonalFFIN = CURDATE() ,btmpersonalHFIN= current_time(), btmpersonalDUR= SUBSTR(TIMEDIFF(current_time(), BTMPERSONALHINI),1,8) 
     WHERE SIOusuarioId= ? and btmpersonalRECID <> 'SBSC' AND  btmpersonalFFIN IS NULL  AND btmpersonalHFIN IS NULL;`;

module.exports.actulizarRecesos = `UPDATE bstntrn.btestagnt SET BTESTAGNTT = 'DIS' WHERE BTESTAGNTUSR = ?;`;

module.exports.infoReceso = `select BTMPERSONALHINI,BTCRECESONOMC,
    if( BTMPERSONALFINI=curdate(),  'SI', 'NO') esHoy from bstntrn.btmpersonal where SIOusuarioId= ?  and BTMPERSONALHFIN IS NULL;`;

module.exports.consultarAgtInb = `SELECT btAgenteCmpId campana 
    FROM bstntrn.btagenteinbound 
    where btAgenteInbId = ? ;`;

module.exports.consultarAgtOut = `SELECT btAgenteCmpId campana 
    FROM bstntrn.btagenteoutbound 
    where btAgenteOutId = ? ;`;

module.exports.consultarSup = `SELECT btsupervisorcanal canal 
    FROM bstntrn.btsupervisor 
    where btsupervisonomp = ? ;`;

module.exports.consultarCoord = `SELECT NRHEMBDCLASEUSER claseUser 
    FROM bdnrh.nrhemdb 
    where NRHEMUSERID = ? and NRHEMBDCLASEUSER = 9  ;`;

module.exports.updateSesiones = `UPDATE  bstntrn.btmpersonal 
    SET BTMPERSONALDURS = TIME_TO_SEC(TIMEDIFF(now(), str_to_date( CONCAT(BTMPERSONALFINI,' ', BTMPERSONALHINI), '%Y-%m-%d %H:%i:%s') )) , 
    BTMPERSONALDUR  = TIMEDIFF(now(), str_to_date( CONCAT(BTMPERSONALFINI,' ', BTMPERSONALHINI), '%Y-%m-%d %H:%i:%s') ),
    BTMPERSONALFFIN = CURDATE() , BTMPERSONALHFIN= current_time() 
    WHERE SIOusuarioId = ?  and BTMPERSONALRECID = ? AND  btmpersonalFFIN IS NULL  AND btmpersonalHFIN IS NULL ;
    `;

module.exports.updateRecesos_ = `UPDATE  bstntrn.btmpersonal 
    SET BTMPERSONALDURS = TIME_TO_SEC(TIMEDIFF(now(), str_to_date( CONCAT(BTMPERSONALFINI,' ', BTMPERSONALHINI), '%Y-%m-%d %H:%i:%s') )) , 
    BTMPERSONALDUR  = TIMEDIFF(now(), str_to_date( CONCAT(BTMPERSONALFINI,' ', BTMPERSONALHINI), '%Y-%m-%d %H:%i:%s') ), 
    BTMPERSONALFFIN = CURDATE() , BTMPERSONALHFIN= current_time() 
    WHERE SIOusuarioId = ?  and BTMPERSONALRECID <> "SBSC" AND  btmpersonalFFIN IS NULL  AND btmpersonalHFIN IS NULL `;


module.exports.updateRecesos = `UPDATE bstntrn.btestagnt SET BTESTAGNTT = ? WHERE BTESTAGNTUSR = ? `;

module.exports.cerrarSesion =  `DELETE FROM bstntrn.monac WHERE monacID=? `;

module.exports.updateMovimientosUsuario =  `UPDATE  bstntrn.btmpersonal 
    SET btmpersonalDURS= FLOOR(TIME_TO_SEC(TIMEDIFF(current_time(), BTMPERSONALHINI))), btmpersonalFFIN = CURDATE(), 
    btmpersonalHFIN= current_time(),btmpersonalDUR = SUBSTR(TIMEDIFF(current_time(), BTMPERSONALHINI),1,8) 
    WHERE SIOusuarioId= ?  and btmpersonalRECID= 'SBSC' AND  btmpersonalFFIN IS NULL  AND btmpersonalHFIN IS NULL `;

module.exports.calcularIdmonacH = `SELECT COALESCE(MAX(monacHID)+1,1) AS id FROM bstntrn.monach`;


module.exports.InsertarSesionTrabajoHistorial= `INSERT INTO bstntrn.monach
    (monacHID,monacID, monacAP, monacF, monacH, monacUA, monacIP, monacEST, monacOD, monacIDEQUIPO, monacRAN) 
    VALUES (?,?,'Agente',CURDATE(),current_time(),'Programa del agente',?,?,'',?,'0') `;