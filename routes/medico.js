/*
    Path : /api/medico
*/


const express = require('express');
const {  getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = express.Router();

router.get( '/*', getMedicos);

router.post('/*', 
    [
        validarJWT,
        check("nombre", 'El nombre del médico es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearMedico
);

router.put('/*', 
    [
        
    ],
    actualizarMedico
);

router.delete('/*', borrarMedico);


module.exports = router;