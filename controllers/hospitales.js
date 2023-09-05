const { response } = require('express');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');


const getHospitales = async(req, res) =>{

    //Recupero hospitales, pero tb recupero usuario que lo ha creado.
    const hospitales = await Hospital.find()
                                     .populate('usuario','nombre img');

    res.json({
        ok:true,
        hospitales
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

const actualizarHospital = async(req, res) =>{
   
    const id = req.params.id;
    const uid = req.uid;

   try {
    
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB){
        res.status(404).json({
            ok:false,
            msg: 'Hospital no encontrado'
        });
    }

    //hospitalDB.nombre = req.body.nombre;
    const cambiosHospital ={
        ...req.body,
        usuario: uid
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new:true});
    

    res.json({
        ok:true,
        hospital : hospitalActualizado
    });
   } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al actualizar la información del hospital'
    });
   }

}

const borrarHospital = async(req, res) =>{
    const id = req.params.id;

   try {
    
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB){
        res.status(404).json({
            ok:false,
            msg: 'Hospital no encontrado'
        });
    }


    await Hospital.findByIdAndDelete(id);
    

    res.json({
        ok:true,
        msg : "Hospital Borrado con éxito",
    });
   } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al eliminar el hospital'
    });
   }
}


module.exports = {
    getHospitales, crearHospital, actualizarHospital, borrarHospital
}