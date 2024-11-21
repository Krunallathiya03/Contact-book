const mongoose = require('mongoose')

//database connection 

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connect thai gyo.....")
    }
    catch(error){
        console.log("Database connect nathi thato....",error)
    }
}




module.exports = connectDB;