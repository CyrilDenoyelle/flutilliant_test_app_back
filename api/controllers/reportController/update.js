const update = require('../../services/reports/update');

module.exports = async (req, res) => {
    try {
        const updatedReport = await update(
            req.user,
            req.body.reportId,
            req.body.update,
        );

        res.status(200).json({
            success: true,
            message: 'Report updated successfully',
            updatedReport,
        });
    } catch (error) {
        console.error(`[controllers] [${__dirname}]`, error);
        throw error;
    }
};
