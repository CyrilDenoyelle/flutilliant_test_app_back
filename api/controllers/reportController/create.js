'use strict';

const createReport = require('../../services/reports/create')

module.exports = async (req, res) => {
    try {
        const { createdReport } = await createReport(req.body, req.user._id);

        res.status(200).json({
            success: true,
            message: 'Report created successfully',
            data: {
                createdReport
            },
        });

    } catch (error) {
        console.error(`[controllers] [${__dirname}]`, error)
        throw error
    }

};
