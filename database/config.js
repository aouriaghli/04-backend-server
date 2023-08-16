//mean_user:dw44a6A5lsgYVqLm
require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);   
        
        console.log('Db Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la Bd, ver logs');
    }    
}

module.exports = {
    dbConnection
}