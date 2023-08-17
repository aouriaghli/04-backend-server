const { response } = require('express');
const  Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req,res = response) => {

    const {email, password} = req.body;

    try {
       

        const usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña no válidos.'
            })
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword){
            return res.status(404).json({
                ok:false,
                msg: 'Contraseña o Email no válidos.'
            })
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            token
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
    login
}