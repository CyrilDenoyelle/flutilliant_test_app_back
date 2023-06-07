const Report = require('../../models/reportModel');

module.exports = async (user, reportId) => {
    try {
        const report = await Report.findOneAndUpdate(
            {
                ...user.role !== 'direct' && { commercialId: user.id },
                _id: reportId,
            },
            { isDeleted: true },
        ).exec();

        return report;
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error);
        throw error;
    }
};
