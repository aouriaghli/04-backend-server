require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


//Crear el servidor express;
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo de los body's

app.use( express.json());

// Base de datos
dbConnection();

//Rutas
app.get( '/api/usuarios', require('./routes/usuarios.js'));
app.post( '/api/usuarios', require('./routes/usuarios.js'));
app.put( '/api/usuarios/:id', require('./routes/usuarios.js'));
app.delete( '/api/usuarios/:id', require('./routes/usuarios.js'));
app.post('/api/login', require('./routes/auth.js'));

app.get('/api/hospitales', require('./routes/hospitales.js'));
app.post( '/api/hospitales', require('./routes/hospitales.js'));
app.put( '/api/hospitales/:id', require('./routes/hospitales.js'));
app.delete( '/api/hospitales/:id', require('./routes/hospitales.js'));

app.get('/api/medicos', require('./routes/medico.js'));
app.post( '/api/medicos', require('./routes/medico.js'));
app.put( '/api/medicos/:id', require('./routes/medico.js'));
app.delete( '/api/medicos/:id', require('./routes/medico.js'));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})

