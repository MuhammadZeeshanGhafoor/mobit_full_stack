const express = require('express');
const  mongoose  = require('mongoose');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes');
const dbConnection = require('./config/dbConnect');
const app = express()

require('dotenv').config()
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json({ type: 'application/*+json' }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


dbConnection();

// parse application/json
// app.use(bodyParser.json())


mongoose.connect('mongodb+srv://zeeshan:zeeshan@cluster0.4rmxebi.mongodb.net/?retryWrites=true&w=majority',(err,response)=>{
     if(err){
          console.log({err, message:'error  connecting '})
     }
     if(response){
          console.log({message:"DB connect"})
     }
})



app.use('/user',userRoutes)

app.post('/newReq', (req, res)=>{
     console.log("body erhere", req.body)
     res.send({message:'message' })
})

app.listen('3001',()=>{
     console.log('localhost:3001')
})