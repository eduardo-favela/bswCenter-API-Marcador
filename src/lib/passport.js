const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const util = require('util');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {

    let url = req.body.url + '/llamadas/api/usuario/login';
    var request = require('request');
    request.post = util.promisify(request.post);
    //request.post('http://service.com/upload', {form:{key:'value'}})
    console.log(url)
    let validar = await request.post(url, { form: { idUsuario: username, pssw: password } });
    if (validar.error) {
        return done(null, false, req.flash('message', 'Ocurrio un error!'));
    } else {
        let response = JSON.parse(validar.body)
        if (response.valido) {
            if(response.puesto == "AGENTE_OUTBOUND" || response.puesto == "AGENTE_INBOUND"){
                url = req.body.url + '/llamadas/api/usuario/registroInicioSesion';
                validar = await request.post(url, { form: { idUsuario: username, puesto: response.puesto } });
                let response2 = JSON.parse(validar.body)
                if(response2.valor == "USUARIO_LOGUEADO"){
                    done(null, false, req.flash('message', 'Usuario con sesión iniciada'), req.flash('info', response2.valor ), req.flash('userIntento', username));
                }else if(response2.valor == "LOGIN_OK"){
                    done(null, response, req.flash('success', response.mensaje));
                }else if(response2.valor == "RECESO_VENCIDO"){
                    done(null, false, req.flash('message', 'Usuario con un receso vencido'), req.flash('info', response2.valor), req.flash('userIntento', username ));
                }else if(response2.valor == "RECESO_ACTUAL"){
                    response.recesoActual = true;
                    done(null, response, req.flash('message', response.mensaje));
                }else if(response2.valor == "USUARIO_NO_AGENTE"){
                    done(null, false, req.flash('message', 'Usuario no agente'));
                }
            }else{
                done(null, response, req.flash('success', response.mensaje));
            }
        } else {
            done(null, false, req.flash('message', response.mensaje));
        }
    }
}));

passport.serializeUser(async(user, done) => {
    done(null, user);
});

passport.deserializeUser(async(user, done) => {
    done(null, user);
});