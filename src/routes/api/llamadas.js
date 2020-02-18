const router = require('express').Router();
const helper = require('../../helpers/llamadas');


router.post('/consultarColas', async(req, res) => {
    let colas = await helper.getAllColas(req.body);
    res.json(colas);
});
router.post('/trasnferirLlamada', async(req, res) => {
    let transferir = await helper.trasnferirLlamada(req.body);
    res.json(transferir);
});

module.exports = router;