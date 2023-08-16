/*
    Ruta: /api/usuarios
*/

const express = require('express');
const { getUsuarios,crearUsuarios } = require('../controllers/usuarios');

const router = express.Router();

router.get( '/*', getUsuarios);

router.post('/*', crearUsuarios);


module.exports = router;