const mongoose = require('mongoose')

const createUser = new mongoose.Schema({
     name: String,
     email: String,
     cell_number:Number,
     age:Number
})

const UserModel = mongoose.model("user", createUser)
module.exports = UserModel;