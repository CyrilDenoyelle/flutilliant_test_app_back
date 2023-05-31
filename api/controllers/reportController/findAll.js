'use strict';

const findAll = require('../../services/reports/findAll')

module.exports = async (req, res) => {
    try {
        const reports = await findAll(req.user);

        res.status(200).json({
            success: true,
            message: 'Reports fetched successfully',
            data: {
                reports
            },
        });

    } catch (error) {
        console.error(`[controllers] [${__dirname}]`, error)
        throw error
    }

};
