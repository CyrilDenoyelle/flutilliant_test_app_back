const update = require('../../services/reports/update');

module.exports = async (req, res) => {
    try {
        await update(
            req.body.reportId,
            req.body.update,
        );

        res.status(200).json({
            success: true,
            message: 'Report updated successfully',
        });
    } catch (error) {
        console.error(`[controllers] [${__dirname}]`, error);
        throw error;
    }
};
