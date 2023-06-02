const User = require('../../models/userModel');

// const ObjectId = require("mongodb").ObjectId; ?????

module.exports = async (id) => {
    try {
        const user = await User.findOne({ _id: id }).exec();

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error);
        throw error;
    }
};
