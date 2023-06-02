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
                subject: user._id.toString(),
            },
        );

        const {
            NODE_ENV,
            ACCESS_TOKEN_EXPIRESIN,
        } = process.env;

        res.cookie('access_token', token, {
            SameSite: NODE_ENV === 'production' ? 'Strict' : 'Lax',
            httpOnly: NODE_ENV === 'production',
            secure: NODE_ENV === 'production',
            maxAge: +ACCESS_TOKEN_EXPIRESIN * 1000, // milliseconds
        });

        return { resWithCookies: res, xsrfToken, user };
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error);
        throw error;
    }
};
