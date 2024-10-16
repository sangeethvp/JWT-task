const mongoose = require('mongoose');


const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('monogodb connected')
    }catch(error){
        console.error("error connecting")
    }
}
module.exports = connectDB;