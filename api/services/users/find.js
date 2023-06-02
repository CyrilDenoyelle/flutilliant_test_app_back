const User = require('../../models/userModel');

module.exports = async ({ id, email }) => {
    try {
        const user = await User.findOne({ id, email }).exec();

        if (!user) throw new Error('User not found');

        return user;
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error);
        throw error;
    }
};
