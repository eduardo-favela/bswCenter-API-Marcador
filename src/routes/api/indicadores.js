const router = require('express').Router();
const helper = require('../../helpers/indicadores');


router.post('/conIndicadores', async(req, res) => {
    if (req.body.cola == '0') {
        req.body.cola = '';
    }
    if (req.body.sts == "ALL") {
        req.body.sts = '';
    }
    if (req.body.sts == "LLAMADA") {
        req.body.sts = 'EN LLAMADA';
    }
    if (req.body.stsres == "ALL") {
        req.body.stsres = '';
    }
    if (req.body.campana == '') {
        req.body.campana = '';
    }
    const conIndicadores = await helper.conIndicadores(req.body.campana, req.body.cola, req.body.ID, req.body.sts, req.body.stsres, req.body.canalCon, '', req.body.agentesActivos);
    res.json(conIndicadores);
});

module.exports = router;