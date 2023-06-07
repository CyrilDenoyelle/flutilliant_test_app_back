const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

if (!process.env.NODE_ENV) throw new Error('you need to define process.env.NODE_ENV');
if (process.env.NODE_ENV.includes('prod')) throw new Error('you cannot run this script in production mode');
require('dotenv').config({
    path: `./config/config.${process.env.NODE_ENV}.env`,
});

const Report = require('../api/models/reportModel');
const User = require('../api/models/userModel');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB_NAME,
} = process.env;

const randomString = () => (Math.random() + 1).toString(36).substring(5);

(async () => {
    await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, {
        user: MONGO_USERNAME,
        pass: MONGO_PASSWORD,
        dbName: MONGO_DB_NAME,
    });

    const users = Array.from({ length: 3 }, () => {
        const userName = randomString();
        return {
            email: `${userName}@gmail.com`,
            password: bcrypt.hashSync(`${userName}!`),
        };
    });

    users.forEach((user) => {
        const userInDb = new User(user);
        userInDb.save();

        const reports = Array.from({ length: 30 }, (_, i) => {
            const customer = randomString();
            const random = 4 + Math.floor(Math.random() * 4) + i / 15;
            const visitDate = new Date();
            visitDate.setDate(visitDate.getDate() + i);
            const nextVisitDate = new Date();
            nextVisitDate.setDate(nextVisitDate.getDate() + i + 15);

            return {
                customerAddress: `${customer}Address`,
                customerName: `${customer}Name`,
                customerContact: `${customer}Contact`,
                visitDate: new Date(visitDate).toISOString(),
                reportBody: `reportBody${customer}`,
                orderedItems: random,
                revenue: random * 2,
                nextVisitDate: new Date(nextVisitDate).toISOString(),
                nextVisitItems: random + 1,
                nextVisitRevenue: (random + 1) * 2,
            };
        });

        reports.forEach(async (report) => {
            const newReport = new Report({
                ...report,
                commercialId: userInDb.id,
            });
            await newReport.save();
        });
    });
})();
