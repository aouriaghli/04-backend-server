/*
    Path : /api/medico
*/


const express = require('express');
const {  getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = express.Router();

router.get( '/',validarJWT, getMedicos);

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
        validarJWT,
        check("nombre", 'El nombre del médico es obligatorio').not().isEmpty(),
        check("hospital", 'El Id del Hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete('/:id',validarJWT, borrarMedico);

router.get('/:id',validarJWT, getMedicoById);


module.exports = router;