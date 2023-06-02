const Report = require('../../models/reportModel');

module.exports = async (user) => {
    try {
        const reports = await Report.find({ commercialId: user.id }).exec();

        if (!reports) throw new Error('Reports not found');

        return reports;
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error);
        throw error;
    }
};
