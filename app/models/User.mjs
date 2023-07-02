import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    entries: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Entry'
        }
    ]
},
{
    timestamps: true
}
);

export default model('User', userSchema);