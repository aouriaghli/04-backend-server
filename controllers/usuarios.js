const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
   
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios: usuarios,
        uid : req.uid
    })
} 


const crearUsuarios = async(req, res = response) => {
   
    const { password, email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya está registrado',
            });
        }

        const usuario = new Usuario( req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();  

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id);
        
        res.json({
            ok: true,
            usuario: usuario,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : 'Error inesperado.. revisar los logs'
        })
    }
}

const actualizarUsuario = async(req, res = response) =>{
    
    // TODO: validar token y comprobar si el usuario correcto.

    const path = req.params[0]; // recuperamos el param 0 que es el id.

    uid = path.split('/')[2];
    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB){
            res.status(404).json({
                ok: false,
                msg : 'No existe un usuario con ese id ' + uid
            });
        }


        //Actualización
        const {password, google, email, ...campos} = req.body;

        if (usuarioDB.email !== email){           
        
            const existeEmail = await Usuario.findOne({ email : email});
            if (existeEmail){
                res.status(400).json({
                    ok: false,
                    msg : 'Ya existe un usuario con ese email ' + req.body.email
                });
            }
        }

        campos.email = email;

        // Al desestructurar en la linea 71, ya no hace falta hacer estas lineas de abajo
        // delete campos.password; // no quiero actualizar contraseña.
        // delete campos.google; // esto tmpc
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario : usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : 'Error inesperado.. revisar los logs'
        });
    }
}

const borrarUsuario = async(req, res = response) =>{
    const path = req.params[0]; // recuperamos el param 0 que es el id.

    uid = path.split('/')[2];

    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB){
            res.status(404).json({
                ok: false,
                msg : 'No existe un usuario con ese id ' + uid
            });
        }

        await Usuario.findByIdAndRemove(uid);

        res.status(200).json({
            ok: true,
            msg : 'Usuario borrado con id ' + uid
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : 'Error inesperado.. revisar los logs'
        });
    }
}




module.exports = {
    getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario
}