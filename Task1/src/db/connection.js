const mongoose = require('mongoose');
const config = require('../config');


const mongoURI = config.MONGO_URI;

//function to connect with mongodb
async function connect(){
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

connect();

module.exports = mongoose;