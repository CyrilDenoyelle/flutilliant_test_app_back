const Report = require('../../models/reportModel');

module.exports = async ({
    customer,
    visitDate,
    reportBody,
    orderedItems,
    revenue,
    nextVisitDate,
    nextVisitItems,
    nextVisitRevenue,
}, userId) => {
    try {
        const report = new Report({
            commercialId: userId,
            customerAddress: customer.address,
            customerName: customer.name,
            customerContact: customer.contact,
            visitDate,
            reportBody,
            orderedItems,
            revenue,
            nextVisitDate,
            nextVisitItems,
            nextVisitRevenue,
        });

        const createdReport = await report.save();

        return { createdReport };
    } catch (error) {
        console.error(`[service] [${__dirname}]`, error);
        throw error;
    }
};
