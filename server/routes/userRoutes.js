const app = require('express').Router();
const UserModel = require('../modal/user')








app.post("/register",(req, res)=>{
     UserModel.findOne({email: req.body.email}, (err, user)=>{
          if(err){
          res.send({error: "user not exist"})
          }else{
               if(user){
                    res.statusCode = 400;
                    res.send({error: 'Email already registered'})
               }else{
                    const user = new UserModel({
                         name:req.body.name,
                         email: req.body.email,
                         age:req.body.age,
                         cell_number:req.body.cell
                    });
                    user.save((err, userRes)=>{
                         if(err){
                              res.send({error: err.message })
                         }else{
                              res.send({message: "user successfully registeres", userRes})
                         }
                    })
               }
          }
     })
     
})


app.post("/list", (req, res) => {
     try {
     UserModel.find({}, function(err, result) {
       if (err) throw err;
       console.log(result);
       res.send(result)
      
     });
     }catch{
          
     }
   });





module.exports = app