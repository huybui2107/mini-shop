const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema( {
    email : {
        type :String,
        required : true,
    },
    password : {
        type :String,
        required : true,
    },
    name :{
        type :String,
        required : true,
    },
    phoneNumber :{
        type :String,
        required : true,
    },
    gender :{
        type :Boolean,
        require :true,
    },
    address :{
        type :String,
        required : true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
},{
    timestamps:true
})

module.exports = new mongoose.model('User' ,User);