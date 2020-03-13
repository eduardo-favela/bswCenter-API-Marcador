const router = require('express').Router();
const helper = require('../../helpers/llamadas');


router.post('/consultarColas', async(req, res) => {
    let colas = await helper.getAllColas(req.body);
    res.json(colas);
});


router.post('/hola', async(req, res) => {
    
    res.json("hola");
});

router.post('/trasnferirLlamada', async(req, res) => {
    if (req.body.contexto == 1) {
        req.body.contexto = "app-chanspy";
    } else if (req.body.contexto == 2) {
        req.body.contexto = "app-inteview"
    } else if (req.body.contexto == 3) {
        req.body.contexto = "app-intrusion"
    }
    let transferir = await helper.trasnferirLlamada(req.body);
    res.json(transferir);
});



router.post('/realizarLlamada', async(req, res) => {
    let realizarLlamada = await helper.realizarLlamada(req.body, res);
    //res.json(realizarLlamada);
});


module.exports = router;