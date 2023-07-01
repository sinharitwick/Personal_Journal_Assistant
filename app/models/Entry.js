const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    metadata: {
        type: Object,
        required: true
    }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;