const mongoose = require('mongoose');

const Report = require('../../api/models/reportModel');

if (!process.env.NODE_ENV) throw new Error('you need to define process.env.NODE_ENV');
require('dotenv').config({
    path: `./config/config.${process.env.NODE_ENV}.env`,
});

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB_NAME,
} = process.env;

(async () => {
    await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, {
        user: MONGO_USERNAME,
        pass: MONGO_PASSWORD,
        dbName: MONGO_DB_NAME,
    });

    await Report.updateMany(
        { isDeleted: { $exists: false } },
        { isDeleted: false },
    );
})();
