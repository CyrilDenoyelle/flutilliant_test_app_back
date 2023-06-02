const checkTokenValidity = require('../services/users/checkTokenValidity');

module.exports = async (req, res, next) => {
    try {
        const { cookies, headers } = req;

        const user = await checkTokenValidity({ cookies, headers });

        if (!user) {
            res.status(401).send('not logged in');
            return;
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(`[middleware] [${__dirname}]`, error);
        res.status(401).send('not logged in');
    }
};
