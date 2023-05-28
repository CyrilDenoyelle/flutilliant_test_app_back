'use strict';

const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');

module.exports = async ({ email, password }) => {
    try {

        const user = new User({
            email,
            password: bcrypt.hashSync(password)
        });

        const createdUser = await user.save();

        return { createdUser };
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error)
        throw error
    }

};
