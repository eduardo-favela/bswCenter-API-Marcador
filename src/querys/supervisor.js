module.exports.consultarSupervisores = `SELECT btsupervisoidn ID, btsupervisonoml DSC FROM bstntrn.btsupervisor  where btsupervisonomp = ? ;`;

module.exports.consultarSupervisoresOut = `SELECT btsupervisoidn ID, btsupervisonoml DSC FROM bstntrn.btsupervisor  where btsupervisonomp = ?;`;

module.exports.consultarSupervisoresAll = `SELECT '' ID,
'Todos' DSC FROM bstntrn.btsupervisor union 
SELECT btsupervisoidn ID, btsupervisonoml DSC FROM bstntrn.btsupervisor;`;

module.exports.consultarSupervisorPorId = `SELECT btsupervisonomp supervisor FROM bstntrn.btsupervisor WHERE btsupervisoidn=?;`;