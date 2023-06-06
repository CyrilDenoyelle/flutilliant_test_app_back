const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'user need an email',
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: 'user need a password',
    },
    role: {
        type: String,
        default: 'commercial',
        required: 'user need a role',
    },
}, {
    collection: 'users',
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
