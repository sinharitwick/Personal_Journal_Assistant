import { Schema, model } from 'mongoose';

const promptSchema = new Schema({
    prompt: {
        type: String,
        required: true
    }
});

export default model('Prompt', promptSchema);