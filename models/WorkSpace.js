const mongoose = require('mongoose');

const WorkSpaceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lists: {
        type: Array,
        required:true,
    }
}, { timestamps: true })

module.exports = mongoose.model('WorkSpace', WorkSpaceSchema)