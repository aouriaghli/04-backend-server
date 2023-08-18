/*
    Path : /api/todo
*/


const express = require('express');
const {  getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');
//
//const { validarCampos } = require('../middlewares/validar-campos');

const router = express.Router();

router.get('/:busqueda', validarJWT , getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT , getDocumentosColeccion);

module.exports = router;