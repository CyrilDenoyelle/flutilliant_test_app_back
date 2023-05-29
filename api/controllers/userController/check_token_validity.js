'use strict';

const checkTokenValidity = require('../../services/users/checkTokenValidity');

module.exports = async (req, res) => {
    try {
        const { cookies, headers } = req;

        const user = await checkTokenValidity({ cookies, headers });
        if (!user) {
            res.status(401).send('not logged in');
            return
        }

        res.json({ user });

    } catch (error) {
        console.error(`[controllers] [${__dirname}]`, error)
        throw error
    }
};
