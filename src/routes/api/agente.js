const router = require('express').Router();
const helper = require('../../helpers/agente');

router.post('/consultarEstatus', async(req, res) => {
    let estatus = await helper.getAllEstatus();
    res.json(estatus);
});

router.post('/consultarAgentes', async(req, res) => {
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
    let consultarAgentes = await helper.consultarAgentes(req.body);
    res.json(consultarAgentes);
});

router.post('/consultarDatosAgente', async(req, res) => {
    let datosAgente = await helper.consultarDatosAgente(req.body.idUsuario);
    res.json(datosAgente);

});

router.post('/consultarIdnAgentes', async(req, res) => {
    let idnAgnts = await helper.consultarIdnAgentes(req.body.agentesActivos);
    res.json(idnAgnts);
});

router.post('/consultarMetricas', async(req, res) => {
    let metricas = await helper.consultarMetricas(req.body);
    res.json(metricas);
});

router.post('/consultarInteracciones', async(req, res) => {
    let interacciones = await helper.consultarInteracciones( req.body.canalesList ,req.body.idUsuario);
    res.json(interacciones);
});

router.post('/cambiarEstatusNuevo', async(req, res) => {
    let cambio = await helper.cambiarEstatusNuevo( req.body.idInteraccion);
    res.json(cambio);
});


router.post('/consultarOpcPrc', async(req, res) => {
    let opcPrc = await helper.consultarOpcPrc();
    res.json(opcPrc);
});

module.exports = router;