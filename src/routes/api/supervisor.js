const router = require('express').Router();
const helper = require('../../helpers/supervisor');


router.post('/consultarSupervisores', async(req, res) => {
    let colas = await helper.consultarSupervisores(req.body);
    res.json(colas);
});

module.exports = router;