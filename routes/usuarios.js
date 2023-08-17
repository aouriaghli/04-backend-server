/*
    Ruta: /api/usuarios
*/

const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios,crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

router.get( '/*', validarJWT, getUsuarios);

router.post('/*', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos, // siempre al final
    ],
    crearUsuarios
);

router.put('/*', 
    [
        validarJWT,
        check('nombre', 'Tienes que poner tu nombre').not().isEmpty(),
        check('email', 'Tienes que poner tu e-mail').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos, // siempre al final
    ],
    actualizarUsuario
);

router.delete('/*',validarJWT, borrarUsuario);


module.exports = router;