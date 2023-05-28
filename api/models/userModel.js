'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'user need an email',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: 'user need a password',
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'users' });

module.exports = mongoose.model('Users', UserSchema);
