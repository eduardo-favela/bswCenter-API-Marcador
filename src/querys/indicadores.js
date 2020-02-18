//Indicadores
module.exports.conIndicadores = "SELECT btagenteInbtStsExt estatus,sum(IF (btagenteInbtStsExt = 'DISPONIBLE',1,0) ) Disponible,SUM(IF (btagenteInbtStsExt = 'EN LLAMADA',1,0) )llamada, " +
    " sum(IF (btagenteInbtStsExt = 'DISPONIBLE',1,0)  + (IF (btagenteInbtStsExt = 'EN LLAMADA',1,0))) Operacion, " +
    " SUM(IF (BTESTAGNTT = 'SOLAUT',1,0)) solAut, SUM(IF (BTESTAGNTT = 'SOL',1,0)) Sol, SUM(IF (BTESTAGNTT = 'RES',1,0)) Res " +
    " FROM bstntrn.btagenteinbound inner join bstntrn.btestagnt on btagenteinbound.btAgenteInbId=bstntrn.btestagnt.BTESTAGNTUSR " +
    " where btAgenteCmpId like concat('%',?,'%') AND btagenteCola like concat('%',?,'%') and btAgenteInbSesion = 'S'" +
    " and btagenteIdSupervis=? AND btagenteInbtStsExt like concat('%',?,'%') AND ifnull(BTESTAGNTT,'DIS') LIKE concat('%',?) AND btAgenteInbId IN (?)";

module.exports.conIndicadoresAll = "SELECT btagenteInbtStsExt estatus,sum(IF (btagenteInbtStsExt = 'DISPONIBLE',1,0) ) Disponible,SUM(IF (btagenteInbtStsExt = 'EN LLAMADA',1,0) )llamada, " +
    " sum(IF (btagenteInbtStsExt = 'DISPONIBLE',1,0)  + (IF (btagenteInbtStsExt = 'EN LLAMADA',1,0))) Operacion, " +
    " SUM(IF (BTESTAGNTT = 'SOLAUT',1,0)) solAut, SUM(IF (BTESTAGNTT = 'SOL',1,0)) Sol, SUM(IF (BTESTAGNTT = 'RES',1,0)) Res " +
    " FROM bstntrn.btagenteinbound inner join bstntrn.btestagnt on btagenteinbound.btAgenteInbId=bstntrn.btestagnt.BTESTAGNTUSR " +
    " where btAgenteCmpId like concat('%',?,'%') AND btagenteCola like concat('%',?,'%') and btAgenteInbSesion = 'S'" +
    " and btagenteIdSupervis like concat('%',?,'%') AND btagenteInbtStsExt like concat('%',?,'%') AND ifnull(BTESTAGNTT,'DIS') LIKE concat('%',?) AND btAgenteInbId IN (?);";