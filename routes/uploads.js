/*
    Path : /api/upload
*/


const express = require('express');
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload } = require('../controllers/uploads');

const router = express.Router();

// default options
router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT , fileUpload);

module.exports = router;