const { response } = require('express');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');


const getHospitales = (req, res) =>{
    res.json({
        ok:true,
        msg: 'getHospitales'
    });
}

const crearHospital = async(req, res = response) =>{

    const uid = req.uid;
    const hospital = new Hospital({
        usuario : uid,
        ...req.body
    });
  

    try {
    
        const hospitalDB = await hospital.save();
        res.json({
            ok:true,
            hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al crear el hospital'
        });   
    }
}

const actualizarHospital = (req, res) =>{
    res.json({
        ok:true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = (req, res) =>{
    res.json({
        ok:true,
        msg: 'borrarHospital'
    });
}


module.exports = {
    getHospitales, crearHospital, actualizarHospital, borrarHospital
}