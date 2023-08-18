/*
    Path : /api/upload
*/


const express = require('express');
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = express.Router();

// default options
router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT , fileUpload);
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;