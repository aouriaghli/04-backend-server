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

console.log(process.env)

//Rutas
app.get( '/api/usuarios', require('./routes/usuarios.js'));
app.post( '/api/usuarios', require('./routes/usuarios.js'));
app.put( '/api/usuarios/:id', require('./routes/usuarios.js'));
app.delete( '/api/usuarios/:id', require('./routes/usuarios.js'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})

