/*
    Ruta: /api/usuarios
*/

const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios,crearUsuarios } = require('../controllers/usuarios');

const router = express.Router();

router.get( '/*', getUsuarios);

router.post('/*', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos, // siempre al final
    ],
    crearUsuarios
);


module.exports = router;