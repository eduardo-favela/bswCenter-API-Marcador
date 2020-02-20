const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const AmiClient = require('asterisk-ami-client');
const util = require('util');
var request = require('request');
const helper = require('./helpers/agente');
const { database } = require('./cnn/keys');

// Intializations
const app = express();
require('./lib/passport');
// Settingss
app.set('port', process.env.PORT || 2000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.ejs');

/////////////////////////////////////////// Middlewares ///////////////////////////////////////////
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'aplicativoomnicanalidadelagente',
    resave: false,
    cookie: { originalMaxAge: 1000 * 60 * 60 },
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

// Global variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.info = req.flash('info');
    app.locals.userIntento = req.flash('userIntento');
    app.locals.user = req.user;
    next();
});

app.use((req, res, next) => {
    if (JSON.stringify(req.body) === '{}') {
        req.body = req.query
    }
    next();
});

// Public
app.use(express.static(path.join(__dirname, '/public')));

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
    // Pass to next layer of middleware
    next();
});

// Routes
/*-------------------------------------------------------------------API-------------------------------------------------------------------*/
app.use('/llamadas/api/usuario', require('./routes/api/usuario'));
app.use('/llamadas/api/canales', require('./routes/api/canales'));
app.use('/llamadas/api/opcprc', require('./routes/api/opcionesproceso'));
app.use('/llamadas/api/llamadas', require('./routes/api/llamadas'));
app.use('/llamadas/api/agente', require('./routes/api/agente'));
app.use('/llamadas/api/supervisor', require('./routes/api/supervisor'));
app.use('/llamadas/api/campana', require('./routes/api/campana'));
app.use('/llamadas/api/indicadores', require('./routes/api/indicadores'));
/*-----------------------------------------------------------------------------------------------------------------------------------------*/

// Starting
app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
});