const router = require('express').Router();
const helper = require('../../helpers/opcionesproceso');

router.post('/', async(req, res) => {
    let opcPrc = await helper.consultarOpcPrc();
    res.json(opcPrc);
});

module.exports = router;