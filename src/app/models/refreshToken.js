const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshToken = new Schema({
     refreshToken: {
        type :String ,
     }
})

module.exports = mongoose.model('refreshToken',refreshToken);