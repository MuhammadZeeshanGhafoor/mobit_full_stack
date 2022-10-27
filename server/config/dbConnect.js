const mongoose = require('mongoose');


         function dbConnection() {
mongoose.connect(process.env.MONGO_URI,(err,res)=>{
     try{
          console.log("DB connect successfuly",resbody)
     }catch(err){
          console.log("DB connect failed", err)

     }
})}

module.exports = dbConnection;
