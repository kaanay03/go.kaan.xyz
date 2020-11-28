const mongoose = require('mongoose')

const LinkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    long_url: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Link', LinkSchema)