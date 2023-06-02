const createUser = require('../../services/users/create');

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;
        await createUser({ email, password });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error(`[controllers] [${__dirname}]`, error);
        throw error;
    }
};
