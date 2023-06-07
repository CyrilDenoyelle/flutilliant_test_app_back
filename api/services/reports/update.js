const Report = require('../../models/reportModel');

module.exports = async (user, reportId, updates) => {
    try {
        const reports = await Report.findOneAndUpdate({
            ...user.role !== 'direct' && { commercialId: user.id },
            _id: reportId,
        }, updates).exec();

        return reports;
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error);
        throw error;
    }
};
