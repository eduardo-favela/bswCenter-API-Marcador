const router = require('express').Router();
const helper = require('../../helpers/campana');


router.post('/consultarCampanas', async(req, res) => {
    let campanas = await helper.getAllCampanas(req.body);
    res.json(campanas);
});

module.exports = router;