require('dotenv').config();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req,res=response,next) => {

    //Leer Token
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la petición.'
        });
    }

    //verificar el token
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
       
        req.uid = uid;
        next();
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg: 'Token incorrecto.'
        });
    }
}

const validarADMIN_ROLE = ( req, res = response, next ) => {
    
        const uid = req.uid;
    
        try {
            const usuarioDB = Usuario.findById( uid );
    
            if ( !usuarioDB ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Usuario no existe'
                });
            }
    
            if ( usuarioDB.role !== 'ADMIN_ROLE' ) {
                return res.status(403).json({
                    ok: false,
                    msg: 'No tiene privilegios para realizar esta acción'
                });
            }
    
            next();
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado, hable con el administrador'
            });
        }
}

const validarADMIN_ROLE_o_MismoUsuario = ( req, res = response, next ) => {
    
    const uid = req.uid; // id del usuario que hace la petición
    const id = req.params.id; // id del usuario a actualizar

    try {
        const usuarioDB = Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role === 'ADMIN_ROLE' || uid === id ) {
            next();    
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esta acción'
            });
        }

        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    }
}

module.exports = {
    validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario
}