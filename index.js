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
app.use( '/api/usuarios', require('./routes/usuarios.js'));
app.use('/api/login', require('./routes/auth.js'));
app.use('/api/hospitales', require('./routes/hospitales.js'));
app.use('/api/medicos', require('./routes/medico.js'));
app.use('/api/todo', require('./routes/busquedas.js'));

app.use('/api/upload', require('./routes/uploads'));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})



