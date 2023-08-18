const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];
    if (!tiposValidos.includes(tipo)){
        return res.status(400).json({
                ok:false,
                msg: 'El tipo indicado no es correcto'
        });
    }

    // validamos que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningun archivo adjuntado'
        });
    }

    //Procesar la imagen...
    const file = req.files.imagen; //imagen es el nombre del parametro en la request
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length -1].toLowerCase();

    //validar la extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if (!extensionesValidas.includes(extension)){
        return res.status(400).json({
                ok:false,
                msg: 'La extenseión del archivo no está permitido.'
        });
    }

    //Generar el nombre del archivo.
    const nombreArchivo = `${ uuidv4()}.${extension}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen al path    
    file.mv(path, function(err) {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            });
        }

        //Actualizar Base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok:true,
            msg : 'Archivo movido',
            nombreArchivo
        });
    });
}

module.exports = {
    fileUpload
}