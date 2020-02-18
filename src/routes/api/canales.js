const router = require('express').Router();
const helper = require('../../helpers/canales');


router.post('/', async(req, res) => {
    var canales = await helper.consultar(req.body);
    res.json(canales);
});


module.exports = router;