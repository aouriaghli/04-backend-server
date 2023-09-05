const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res) =>{
    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');

    res.json({
        ok:true,
        medicos
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

const actualizarMedico = async(req, res) =>{
   
    const id = req.params.id;
    const uid = req.uid;

   try {
    
    const medicoDB = await Medico.findById(id);
    if (!medicoDB){
        res.status(404).json({
            ok:false,
            msg: 'Médico no encontrado'
        });
    }

    const cambiosMedico ={
        ...req.body,
        usuario: uid
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new:true});
    

    res.json({
        ok:true,
        medico : medicoActualizado
    });
   } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al actualizar la información del médico'
    });
   }

}

const borrarMedico = async(req, res) =>{
    const id = req.params.id;

   try {
    
    const medicoDB = await Medico.findById(id);
    if (!medicoDB){
        res.status(404).json({
            ok:false,
            msg: 'Medico no encontrado'
        });
    }


    await Medico.findByIdAndDelete(id);
    

    res.json({
        ok:true,
        msg : "Médico Borrado con éxito",
    });
   } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al eliminar el médico'
    });
   }
}


module.exports = {
    getMedicos, crearMedico, actualizarMedico, borrarMedico
}