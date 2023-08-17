/*
    Ruta: /api/auth
*/

const express = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos');

const router = express.Router();


router.post('/*', 
    [
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),        
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        validarCampos, // siempre al final
    ],
    login
);



module.exports = router;