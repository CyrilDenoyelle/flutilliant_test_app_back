const Report = require('../../models/reportModel');

module.exports = async (reportId, updates) => {
    try {
        const reports = await Report.findOneAndUpdate({ _id: reportId }, updates).exec();

        return reports;
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error);
        throw error;
    }
};
