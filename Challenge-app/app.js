const express = require('express');
const app = express();
const methodOverride = require('method-override')
const session = require('express-session')
const authUser = require('./middlewares/authUser')

// Configuración
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'challenge',
    resave: false,
    saveUninitialized: true
}))

app.use(authUser);

// Rutas
const moviesRouter = require('./routes/moviesRouter')

app.use('/', moviesRouter);


// Iniciamos el servidor
app.listen(8080, () => { console.log('Servidor escuchando') });