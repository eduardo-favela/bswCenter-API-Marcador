const router = require('express').Router();
const helper = require('../../helpers/usuario');


router.post('/login', async(req, res) => {
    var loginUsuario = await helper.login(req.body);
    res.json(loginUsuario);
});

router.get('/login', async(req, res) => {
    var loginUsuario = await helper.login(req.query);
    res.json(loginUsuario);
});

router.post('/info', async(req, res) => {
    let infouser = await helper.userinfo(req.body);
    res.json(infouser);
});

router.post('/registroInicioSesion', async(req, res) => {
    const usuario = await helper.registroInicioSesion(req.body);
    res.json(usuario);
});

router.post('/registroInicioSesion', async(req, res) => {
    const usuario = await helper.registroInicioSesion(req.body);
    res.json(usuario);
});

router.post('/consultarNombre', async(req, res) => {
    const usuario = await helper.consultarNombre(req.body.idUsuario);
    res.json(usuario);
});


router.post('/terminarSesiones', async(req, res) => {
    const terminarSesiones = await helper.terminarSesiones(req.body.idUsuario);
    res.json(terminarSesiones);
});

router.post('/terminarRecesos', async(req, res) => {
    const terminarRecesos = await helper.terminarRecesos(req.body.idUsuario);
    res.json(terminarRecesos);
});


router.post('/cerrarSesion', async(req, res) => {
    const cerrarSesion = await helper.cerrarSesion(req.body.idUsuario);
    res.json(cerrarSesion);
});



module.exports = router;