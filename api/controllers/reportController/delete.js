const deleteReport = require('../../services/reports/delete');

module.exports = async (req, res) => {
    try {
        const deletedReport = await deleteReport(req.user, req.params.id);

        res.status(200).json({
            success: true,
            message: 'Report deleted successfully',
            deletedReport,
        });
    } catch (error) {
        console.error(`[controllers] [${__dirname}]`, error);
        throw error;
    }
};
