const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    custom_slug_perm: {
        type: Boolean, 
        default: false
    },
    password:{
        type: String, 
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)