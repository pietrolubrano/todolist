const mongoose = require('mongoose');

const WorkSpaceSchema = mongoose.Schema({
    admin: mongoose.ObjectId,
    name: {
        type: String,
        required: true
    },
    lists: {
        type: Array,
        required:true,
        default: []
    }
}, { timestamps: true })

module.exports = mongoose.model('WorkSpace', WorkSpaceSchema)