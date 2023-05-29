'use strict';

const jsonwebtoken = require('jsonwebtoken');

const findUserById = require('./findById');

module.exports = async ({ cookies, headers }) => {
    try {

        // JWT token is present in cookies
        if (!cookies || !cookies.access_token) {
            console.error('!cookies || !cookies.access_token')
            return
        }

        // CSRF token is present in headers
        if (!headers || !headers['x-xsrf-token']) {
            return
        }

        // JWT token is valid
        const accessToken = cookies.access_token
        const xsrfToken = JSON.parse(headers['x-xsrf-token']);
        const decoded = jsonwebtoken.verify(
            accessToken,
            process.env.SECRET_JWT_CODE
        )

        // CSRF token matches the one in JWT
        if (xsrfToken !== decoded.xsrfToken) {
            return
        }

        // Find the user in the database
        const user = await findUserById(decoded.id);
        if (!user) throw new Error('user not found');

        return user
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error)
        throw error
    }
};
