require('dotenv').config();
const jwt = require('jsonwebtoken');

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

module.exports = {
    validarJWT,
}