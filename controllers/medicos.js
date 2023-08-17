const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = (req, res) =>{
    res.json({
        ok:true,
        msg: 'getMedicos'
    });
}

const crearMedico = async(req, res = response) =>{
    
    const uid = req.uid;
    const medico = new Medico({
        usuario : uid,        
        ...req.body
    });
  

    try {
    
        const MedicoDB = await medico.save();
        res.json({
            ok:true,
            MedicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al crear el medico'
        });   
    }
}

const actualizarMedico = (req, res) =>{
    res.json({
        ok:true,
        msg: 'actualizarMedico'
    });
}

const borrarMedico = (req, res) =>{
    res.json({
        ok:true,
        msg: 'borrarMedico'
    });
}


module.exports = {
    getMedicos, crearMedico, actualizarMedico, borrarMedico
}