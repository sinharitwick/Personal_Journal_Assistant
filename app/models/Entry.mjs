import { Schema, model } from 'mongoose';

const entrySchema = new Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: Object,
        required: true
    },
    goals: [{
        title: String,
        progress: Number
    }],
    sentiment: {
        type: Object
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default model('Entry', entrySchema);