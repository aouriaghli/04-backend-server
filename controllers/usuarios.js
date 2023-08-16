const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');
const { response } = require('express');

const getUsuarios = async(req, res) => {
   
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios: usuarios
    })
} 


const crearUsuarios = async(req, res = response) => {
   
    const {nombre, password, email } = req.body;
    const errores = validationResult(req);

    if (!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }

    try {

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya está registrado',
            });
        }

        const usuario = new Usuario( req.body);

        await usuario.save();  
        
        res.json({
            ok: true,
            usuario: usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : 'Error inesperado.. revisar los logs'
        })
    }
}


module.exports = {
    getUsuarios,crearUsuarios
}