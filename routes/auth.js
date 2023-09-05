/*
    Ruta: /api/auth
*/

const express = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();


router.post('/', 
    [
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),        
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        validarCampos, // siempre al final
    ],
    login
);

router.post('/google', 
    [        
        check('token','El token de google es obligatorioemail es obligatorio').not().isEmpty(),
    ],
    googleSignIn
);


router.get('/renew', 
    validarJWT,
    renewToken
);



module.exports = router;