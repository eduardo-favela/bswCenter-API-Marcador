module.exports.getAllCampanas = `SELECT '' ID, 'Todas' DSC UNION SELECT btcampanas.btcampanaid ID,Concat(btcampanas.btcampanaid,'-',btcampanadescripcion) DSC 
FROM bstntrn.btcampanas 
LEFT JOIN bstntrn.btsupervisordet as a on a.btcampanaid=btcampanas.btcampanaid 
LEFT JOIN bstntrn.btsupervisor on a.btsupervisoidn=btsupervisor.btsupervisoidn 
WHERE btsupervisor.btsupervisonomp like concat ('%',?,'%');`;

module.exports.getAllCampanasSpusr = `SELECT '' ID, 'Todas' DSC UNION SELECT btcampanas.btcampanaid ID,Concat(btcampanas.btcampanaid,'-',btcampanadescripcion) DSC 
FROM bstntrn.btcampanas ;`;