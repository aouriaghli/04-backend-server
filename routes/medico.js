/*
    Path : /api/medico
*/


const express = require('express');
const {  getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = express.Router();

router.get( '/', getMedicos);

router.post('/', 
    [
        validarJWT,
        check("nombre", 'El nombre del médico es obligatorio').not().isEmpty(),
        check("hospital", 'El Id del Hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id', 
    [
        
    ],
    actualizarMedico
);

router.delete('/:id', borrarMedico);


module.exports = router;