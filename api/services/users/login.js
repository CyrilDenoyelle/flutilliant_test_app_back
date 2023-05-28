'use strict';

const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const findUser = require('./find');

module.exports = async ({ email, password }, res) => {
    try {

        const user = await findUser({ email });

        if (!user) throw new Error('nope');
        if (!bcrypt.compareSync(password, user.password)) throw new Error('nope');

        const xsrfToken = crypto.randomBytes(64).toString('hex');

        const token = jsonwebtoken.sign(
            { id: user._id, email: user.email, xsrfToken },
            process.env.SECRET_JWT_CODE,
            {
                expiresIn: +process.env.ACCESS_TOKEN_EXPIRESIN, // seconds
                subject: user._id.toString()
            }
        );

        res.cookie('access_token', token, {
            httpOnly: process.env.NODE_ENV === 'production' ? true : null,
            secure: process.env.NODE_ENV === 'production' ? true : null,
            maxAge: +process.env.ACCESS_TOKEN_EXPIRESIN * 1000 // milliseconds
        });

        return { resWithCookies: res, xsrfToken, user }
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error)
        throw error
    }
};
