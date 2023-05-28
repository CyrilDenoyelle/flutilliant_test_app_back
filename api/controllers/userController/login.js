'use strict';

const userLogin = require('../../services/users/login');

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { xsrfToken, resWithCookies, user } = await userLogin({ email, password }, res);

        resWithCookies.status(200).json({
            success: true,
            accessTokenExpiresIn: +process.env.ACCESS_TOKEN_EXPIRESIN * 1000,
            xsrfToken,
            user
        });

    } catch (error) {
        console.error(`[controllers] [${__dirname}]`, error);
        throw error;
    }
};
