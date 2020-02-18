module.exports.consultarCanales = `SELECT NRHEMDBIDG id, NRHEMUSERID usuario, GROUP_CONCAT(bstnCanalIDN) canales 
FROM bdnrh.nrhemdbmc WHERE NRHEMUSERID = ? GROUP BY NRHEMDBIDG; `;
