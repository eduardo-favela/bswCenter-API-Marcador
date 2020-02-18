module.exports.getAllEstatus = `SELECT btestatusmonitorId ID, btestatusmonitorDsc DSC FROM bstntrn.btestatusmonitor limit 3`;

module.exports.getEstatusRes = `SELECT btestatusmonitorId ID, btestatusmonitorDsc DSC FROM bstntrn.btestatusmonitor WHERE btestatusmonitorId = 'ALL' 
UNION SELECT btestatusmonitorId ID, btestatusmonitorDsc DSC FROM bstntrn.btestatusmonitor WHERE btestatusmonitorDsc LIKE concat('%','receso','%')`;

module.exports.consultarAgentes = `SELECT 'I' area, btAgenteInbId id,btAgenteInbNombre nom,btAgenteInbExt ext, btagenteInbtStsExt sts, 
CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN  ifnull(SEC_TO_TIME(TIMESTAMPDIFF(second,btagenteinbhorallam,now())), '00:00:00') 
WHEN btagenteInbtStsExt = 'RECESO' THEN  ifnull(SEC_TO_TIME(TIMESTAMPDIFF(second,BTESTAGNTSALRECESO,now())), '00:00:00') ELSE '00:00:00' END duracion,
CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN ifnull(btagenteIdLlamada,'') ELSE '' END idllamada,  ifnull(btagenteinbinicio, '00:00:00') inicio, 
ifnull(B.BTESTAGNTT, 'DIS') stsrec,'00:00:00' duracionreceso,'' permiso, 
CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN btagenteNumeroCli ELSE '' END Telefono, 
CASE WHEN btagenteInbtStsExt = 'DISPONIBLE' OR 'TIMBRANDO' THEN '0' ELSE btagenteinbduracion END duracionseg,  
ifnull(btagenteCola,'300') skill,btagenteServidorip Servidor, CASE WHEN ifnull(B.BTESTAGNTT, 'DIS') = 'DIS' THEN '' ELSE BTESTAGNTMOTIVO END permiso, '' src,
DATE_FORMAT(now(), '%d/%m/%Y') fecha, 
CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN DATE_FORMAT(btagenteinbhorallam, '%H:%i:%s') 
WHEN btagenteInbtStsExt = 'RECESO' THEN DATE_FORMAT(BTESTAGNTSALRECESO, '%H:%i:%s') ELSE '00:00:00' END hora, 
CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN TIME_TO_SEC(DATE_FORMAT(NOW(), '%h:%i:%s')) - TIME_TO_SEC(DATE_FORMAT(btagenteinbhorallam, '%h:%i:%s')) 
ELSE '0' END segundos, 
CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN ifnull(btagenteNombreCli,'') ELSE '' END nombreCliente 
FROM bstntrn.btagenteinbound A LEFT JOIN bstntrn.btestagnt B ON A.btAgenteInbId = B.BTESTAGNTUSR 
where btAgenteCmpId like concat('%',?,'%') and btAgenteInbSesion = 'S' AND btagenteCola like concat('%',?,'%') 
and btagenteIdSupervis= ? AND btagenteInbtStsExt like concat('%',?,'%') AND ifnull(BTESTAGNTT,'DIS') LIKE concat('%',?) and btAgenteInbId in (?);`;

module.exports.consultarAgentesAll = `SELECT 'I' area, btAgenteInbId id,btAgenteInbNombre nom,btAgenteInbExt ext, btagenteInbtStsExt sts, 
    CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN  ifnull(SEC_TO_TIME(TIMESTAMPDIFF(second,btagenteinbhorallam,now())), '00:00:00') 
    WHEN btagenteInbtStsExt = 'RECESO' THEN  ifnull(SEC_TO_TIME(TIMESTAMPDIFF(second,BTESTAGNTSALRECESO,now())), '00:00:00') ELSE '00:00:00' END duracion, 
    CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN ifnull(btagenteIdLlamada,'') ELSE '' END idllamada,  ifnull(btagenteinbinicio, '00:00:00') inicio, 
    ifnull(B.BTESTAGNTT, 'DIS') stsrec,'00:00:00' duracionreceso,'' permiso, 
    CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN btagenteNumeroCli ELSE '' END Telefono, 
    CASE WHEN btagenteInbtStsExt = 'DISPONIBLE' OR 'TIMBRANDO' THEN '0' ELSE btagenteinbduracion END duracionseg,  
    ifnull(btagenteCola,'300') skill,btagenteServidorip Servidor, CASE WHEN ifnull(B.BTESTAGNTT, 'DIS') = 'DIS' THEN '' ELSE BTESTAGNTMOTIVO END permiso, '' src, 
    DATE_FORMAT(now(), '%d/%m/%Y') fecha, 
    CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN DATE_FORMAT(btagenteinbhorallam, '%H:%i:%s') 
    WHEN btagenteInbtStsExt = 'RECESO' THEN DATE_FORMAT(BTESTAGNTSALRECESO, '%H:%i:%s') ELSE '00:00:00' END hora, 
    CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' 
    THEN TIME_TO_SEC(DATE_FORMAT(NOW(), '%h:%i:%s')) - TIME_TO_SEC(DATE_FORMAT(btagenteinbhorallam, '%h:%i:%s')) ELSE '0' END segundos, 
    CASE WHEN btagenteInbtStsExt = 'EN LLAMADA' THEN ifnull(btagenteNombreCli,'') ELSE '' END nombreCliente 
    FROM bstntrn.btagenteinbound A LEFT JOIN bstntrn.btestagnt B ON A.btAgenteInbId = B.BTESTAGNTUSR 
    where btAgenteCmpId like concat('%',?,'%') and btAgenteInbSesion = 'S' AND btagenteCola like concat('%',?,'%') 
    and btagenteIdSupervis like concat('%',?,'%') AND btagenteInbtStsExt like concat('%',?,'%') AND ifnull(BTESTAGNTT,'DIS') LIKE concat('%',?) and btAgenteInbId in (?)`;

module.exports.consultarAgentesOut = `SELECT 'O' area, btAgenteOutId id,btAgenteOutNombre nom,btAgenteCmpId cmp,btAgenteOutExt ext,btagenteOutStsExt sts, 
    ifnull(z.BTESTAGNTT, 'DIS') stsrec, 
    ifnull(date_format(TIMEDIFF(now(),BTESTAGNTSALRECESO),'%H:%i:%s'),'00:00:00') duracionreceso, btagenteOutTelefonoCliente Telefono,
    BTESTAGNTPERMISOID permisoid,BTESTAGNTPERMISO permiso, 
    DATE_FORMAT(now(), '%d/%m/%Y') fecha, CASE WHEN btagenteoutStsExt = 'EN LLAMADA' THEN DATE_FORMAT(btagenteouthorallam, '%H:%i:%s') ELSE '00:00:00' END hora, 
    CASE WHEN btagenteoutStsExt = 'EN LLAMADA' THEN  ifnull(SEC_TO_TIME(TIMESTAMPDIFF(second,btagenteouthorallam,now())), '00:00:00') ELSE '00:00:00' END duracion, 
    CASE WHEN btagenteoutStsExt = 'EN LLAMADA' THEN ifnull(C.btContactoNombreCliente,'') else '' END nombreCliente, 
    CASE WHEN btagenteoutStsExt = 'EN LLAMADA' THEN ifnull(z.BTESTAGNTCALLID,'') else '' END idllamada 
    FROM siogen01.cnuser a 
    inner join bstntrn.btsupervisor b on a.cnusersupervisor = b.btsupervisoidn 
    inner join bstntrn.bstncanal cnl on b.btsupervisorcanal = cnl.bstnCanalIDN 
    inner join bstntrn.btcampanas cmp on b.btsupervisorcamp = cmp.btcampanaid and cnl.bstnCanalId = cmp.bstnCanalId 
    left join bstntrn.btagenteoutbound aout on a.cnuserid = aout.btAgenteOutId 
    LEFT JOIN bstntrn.btestagnt z ON aout.btAgenteOutId = z.BTESTAGNTUSR 
    LEFT JOIN bstntrn.btcontacto C ON (C.btcontactoconsecutivo = aout.btAgenteOutClienteId and C.btcontactocmpid = aout.btagentecmpid) 
    WHERE aout.btAgenteOutSesion = 'S' and CNUSERBAJA='N' AND aout.btAgenteCmpId like concat('%',?,'%') AND b.btsupervisoidn=? 
    AND btagenteOutStsExt like concat('%',?,'%') AND ifnull(BTESTAGNTT,'DIS') LIKE concat('%',?) and btAgenteOutId in (?)`;

module.exports.consultarAgentesOutAll = `SELECT 'O' area, btAgenteOutId id,btAgenteOutNombre nom,btAgenteCmpId cmp,btAgenteOutExt ext,btagenteOutStsExt sts,
     ifnull(z.BTESTAGNTT, 'DIS') stsrec, 
     ifnull(date_format(TIMEDIFF(now(),BTESTAGNTSALRECESO),'%H:%i:%s'),'00:00:00') duracionreceso, 
     btagenteOutTelefonoCliente Telefono,BTESTAGNTPERMISOID permisoid,BTESTAGNTPERMISO permiso,
     DATE_FORMAT(now(), '%d/%m/%Y') fecha, CASE WHEN btagenteoutStsExt = 'EN LLAMADA' THEN DATE_FORMAT(btagenteouthorallam, '%H:%i:%s') ELSE '00:00:00' END hora,
     CASE WHEN btagenteoutStsExt = 'EN LLAMADA' THEN  ifnull(SEC_TO_TIME(TIMESTAMPDIFF(second,btagenteouthorallam,now())), '00:00:00') ELSE '00:00:00' END duracion,
     CASE WHEN btagenteoutStsExt = 'EN LLAMADA' THEN ifnull(C.btContactoNombreCliente,'') else '' END nombreCliente,
     CASE WHEN btagenteoutStsExt = 'EN LLAMADA' THEN ifnull(z.BTESTAGNTCALLID,'') else '' END idllamada 
     FROM siogen01.cnuser a 
     inner join bstntrn.btsupervisor b on a.cnusersupervisor = b.btsupervisoidn 
     inner join bstntrn.bstncanal cnl on b.btsupervisorcanal = cnl.bstnCanalIDN 
     inner join bstntrn.btcampanas cmp on b.btsupervisorcamp = cmp.btcampanaid and cnl.bstnCanalId = cmp.bstnCanalId 
     left join bstntrn.btagenteoutbound aout on a.cnuserid = aout.btAgenteOutId 
     LEFT JOIN bstntrn.btestagnt z ON aout.btAgenteOutId = z.BTESTAGNTUSR 
     LEFT JOIN bstntrn.btcontacto C ON (C.btcontactoconsecutivo = aout.btAgenteOutClienteId and C.btcontactocmpid = aout.btagentecmpid) 
     WHERE aout.btAgenteOutSesion = 'S' and CNUSERBAJA='N' AND aout.btAgenteCmpId like concat('%',?,'%') 
     AND b.btsupervisoidn like concat('%',?,'%') AND btagenteOutStsExt like concat('%',?,'%') AND ifnull(BTESTAGNTT,'DIS') LIKE concat('%',?) and btAgenteOutId in (?)`;

module.exports.consultarDatosAgente = `SELECT cnuserid id, cnuserdsc nombre, btAgenteInbExt extension,CNUSERSERIN servidorin,ifnull(servin.servidorespasedominio,'0') domin,btAgenteOutExt extensionOutbound,      
    CNUSERSEROUT servidorout,ifnull(servout.servidorespasedominio,'0') domout, b.btsupervisonoml supervisor, b.nrhgempid proyecto, 
    cmp.bstnCanalId,b.btsupervisorcanal,cmp.btcmasiva,cmp.btcindividual,cmp.btcmodalidad,cmp.btcasigancion,cmp.btcampanaid campanaid,cmp.btcampanadescripcion cmpdsc, 
    cmp.btscript scrip , cmp.btcampanastefrm tiempoFRM, cmp.btcampanastetip tiempoTip  
    FROM siogen01.cnuser a  
    inner join bstntrn.btsupervisor b on a.cnusersupervisor = b.btsupervisoidn 
    left join bstntrn.btagenteoutbound aout on a.cnuserid = aout.btAgenteOutId 
    inner join bstntrn.bstncanal cnl on aout.btAgenteCanalId  = cnl.bstnCanalIDN 
    inner join bstntrn.btcampanas cmp on aout.btAgenteCmpId = cmp.btcampanaid and cnl.bstnCanalId = cmp.bstnCanalId 
    left join espejoshistoricos.servidorespase servin on a.CNUSERSERIN = servin.servidorespaseid 
    left join espejoshistoricos.servidorespase servout on a.CNUSERSEROUT = servout.servidorespaseid 
    left join bstntrn.btagenteinbound ain on a.cnuserid = ain.btAgenteInbId 
    WHERE cnuserID = ? and CNUSERBAJA = 'N';`


module.exports.consultarDatosAgente2 = `SELECT cnuserid id, cnuserdsc nombre, btAgenteInbExt extension,CNUSERSERIN servidorin,ifnull(servin.servidorespasedominio,'0') domin,btAgenteOutExt extensionOutbound,      
    CNUSERSEROUT servidorout,ifnull(servout.servidorespasedominio,'0') domout, b.btsupervisonoml supervisor, b.nrhgempid proyecto, 
    cmp.bstnCanalId,b.btsupervisorcanal,cmp.btcmasiva,cmp.btcindividual,cmp.btcmodalidad,cmp.btcasigancion,cmp.btcampanaid campanaid,cmp.btcampanadescripcion cmpdsc, cmp.btscript scrip, cmp.btcampanastefrm tiempoFRM, cmp.btcampanastetip tiempoTip  
    FROM siogen01.cnuser a  
    inner join bstntrn.btsupervisor b on a.cnusersupervisor = b.btsupervisoidn 
    inner join bstntrn.bstncanal cnl on b.btsupervisorcanal = cnl.bstnCanalIDN 
    inner join bstntrn.btcampanas cmp on b.btsupervisorcamp = cmp.btcampanaid and cnl.bstnCanalId = cmp.bstnCanalId 
    left join espejoshistoricos.servidorespase servin on a.CNUSERSERIN = servin.servidorespaseid 
    left join espejoshistoricos.servidorespase servout on a.CNUSERSEROUT = servout.servidorespaseid 
    left join bstntrn.btagenteinbound ain on a.cnuserid = ain.btAgenteInbId 
    left join bstntrn.btagenteoutbound aout on a.cnuserid = aout.btAgenteOutId 
    WHERE cnuserID = ? and CNUSERBAJA = 'N'; `

module.exports.consultarAreas = `SELECT  reun.RPFREUNUSRID usuario ,RPFREUNARESID area, RPFLINEA linea,btversion.BTVERSIONDSCC areaTitulo ,BTVERSIONDSCL nombreVersion , BTVERSIONID version,  
    opproc.valor generico, opproc.valor2 idcliente,btversioncanal,btversionmevid tipificacion FROM bstntrn.btversion  
    inner JOIN bstntrn.btsnareversion as areaVersion ON btversion.BTVERSIONID = areaVersion.btsnareversionidversion  
    inner JOIN siogen01.rpfreun as reun ON reun.RPFREUNARESID = areaVersion.btsnareversionaresid and reun.RPFLINEA=areaVersion.btsnareversionlineaid  
    INNER JOIN bstntrn.bstopcionesproceso opproc on btversion.BTVERSIONID = opproc.version and opproc.opcionProc = 'opci1'  
    where RPFREUNUSRID = ? ;`

module.exports.consultarIdnAgnts = `SELECT * FROM bstntrn.bstnidnagnts where idagente in (?);`;


module.exports.consultarTotalInteracciones = `SELECT count(imcidn) total FROM inmc.imc WHERE inmcestid = 1 ;`;

module.exports.consultarInteracciones = `SELECT imcidn, inmccanalid, inmcestid, imcfecha, imchora, imcagente, imccliente, imctelefono, 
imccorreo, imcduracion, imcfechainiatn, imchorainiatn, imcclienteid, imcesnuevo,imcsesionid , str_to_date(CONCAT(imcfecha, " ", imchora),  "%Y-%m-%d %H:%i:%s") date_
FROM inmc.imc WHERE imcagente = ? and inmcestid = 1 order by date_ desc`;

module.exports.consultarNoVistosChatFB = `SELECT count(spcfbid) total, spcfbidn id    
    FROM spcfacebook.spcfbmensaje msj    
    inner join spcfacebook.spcfbcontactos cte on msj.spcfbidn = cte.spcfbtcontactosnumero    
    where spcfbfromMe = false and spcfbestatus = 1 and cte.spcfbcontactosagenteasignado = ? group by spcfbidn ; `

module.exports.consultarUltimoMensajeChatFB = ` SELECT a.spcfbtcontactosnumero id,   
    (SELECT spcfbbody FROM spcfacebook.spcfbmensaje where spcfbidn = a.spcfbtcontactosnumero order by spcfbfecha desc limit 1) cuerpo,   
    (SELECT spcfbtype FROM spcfacebook.spcfbmensaje where spcfbidn = a.spcfbtcontactosnumero order by spcfbfecha desc limit 1) tipo ,   
    (SELECT spcfbfecha FROM spcfacebook.spcfbmensaje where spcfbidn = a.spcfbtcontactosnumero order by spcfbfecha desc limit 1) fecha,   
    a.spcfbcontactosagenteasignado   
    FROM spcfacebook.spcfbcontactos a where a.spcfbcontactosagenteasignado = ? ; `

module.exports.consultarNoVistosChatWTS = `SELECT count(msj.spcwtid) total, spcwtnumeroCliente id    
    FROM spcwtsapp.spcwtmensaje msj    
    inner join spcwtsapp.spcwtnumeros cte on msj.spcwtnumeroCliente = cte.spcwtnumero    
    where spcwtfromMe = false and msj.spcwestatus = 1 and cte.spcwagenteasignado = ? group by spcwtnumeroCliente ; `

module.exports.consultarUltimoMensajeChatWTS = ` SELECT spcwtnumero id ,    
    (SELECT spcwtbody FROM spcwtsapp.spcwtmensaje where spcwtnumeroCliente = spcwtnumero order by spcwtfecha desc limit 1) cuerpo,    
    (SELECT spcwttype FROM spcwtsapp.spcwtmensaje where spcwtnumeroCliente = spcwtnumero order by spcwtfecha desc limit 1) tipo ,   
    (SELECT spcwtfecha FROM spcwtsapp.spcwtmensaje where spcwtnumeroCliente = spcwtnumero order by spcwtfecha desc limit 1) fecha,   
    spcwagenteasignado   
    FROM spcwtsapp.spcwtnumeros where spcwagenteasignado = ? ; `

module.exports.consultarNoVistosChatTW = `SELECT count(spctwid) total, spctwidn id    
    FROM spctwitter.spctwmensaje msj    
    inner join spctwitter.spctwcontactos cte on msj.spctwidn = cte.spctwtcontactosnumero    
    where spctwfromMe = false and spctwestatus = 1 and cte.spctwcontactosagenteasignado = ? group by spctwidn ;`

module.exports.consultarUltimoMensajeChatTW = `SELECT a.spctwtcontactosnumero id,   
    (SELECT spctwbody FROM spctwitter.spctwmensaje where spctwidn = a.spctwtcontactosnumero order by spctwfecha desc limit 1) cuerpo,   
    (SELECT spctwtype FROM spctwitter.spctwmensaje where spctwidn = a.spctwtcontactosnumero order by spctwfecha desc limit 1) tipo ,   
    (SELECT spctwfecha FROM spctwitter.spctwmensaje where spctwidn = a.spctwtcontactosnumero order by spctwfecha desc limit 1) fecha,   
    a.spctwcontactosagenteasignado   
    FROM spctwitter.spctwcontactos a where a.spctwcontactosagenteasignado = ?;`


module.exports.consultarNoVistosChat = ` SELECT count(msj.PRTCHMSJID) total, concat(msj.PRTID, '.', msj.PRTCHCLID)  id     
    FROM siogen01.prtchmsj msj     
    inner join siogen01.prtchcl cte on msj.PRTCHCLID = cte.PRTCHCLID       
    where PRTCHMSJQA = '1' and msj.PRTCHMSJVISTO = 0 and cte.CNUSERID = ? and cte.PRTCHCLEST = '2' group by id;`

module.exports.consultarUltimoMensajeChat = ` SELECT concat(a.PRTID, '.', a.PRTCHCLID) id,   
    (SELECT PRTCHMSJTXT FROM siogen01.prtchmsj where PRTCHCLID = a.PRTCHCLID and PRTID = a.PRTID order by PRTCHMSJFH desc limit 1 ) cuerpo,   
    'chat' tipo,   
    (SELECT PRTCHMSJFH FROM siogen01.prtchmsj where PRTCHCLID = a.PRTCHCLID and PRTID = a.PRTID order by PRTCHMSJFH desc limit 1 ) fecha   
    FROM siogen01.prtchcl a where a.CNUSERID = ? and a.PRTCHCLEST = 2; `


module.exports.cambiarEstatusNuevo = ` UPDATE inmc.imc SET imcesnuevo = 1  WHERE imcidn = ? ; `

module.exports.totalMsjFB = `SELECT count(spcfbid) totalMsj FROM spcfacebook.spcfbmensaje where spcfbestatus = "1"`;

module.exports.totalMsjWTS = `SELECT count(spcwtid) totalMsj FROM spcwtsapp.spcwtmensaje where spcwestatus = "1"`;

module.exports.totalMsjTW = `SELECT count(spctwid) totalMsj FROM spctwitter.spctwmensaje where spctwestatus = "1"`;

module.exports.totalMsjCH= `SELECT count(PRTCHCLID) totalMsj FROM siogen01.prtchmsj WHERE PRTCHMSJQA = "1" and PRTCHMSJVISTO = 0`;


module.exports.consultarOpcPrc = `SELECT idN, nombre, valor FROM bstntrn.spcpagtopcprc;`
