const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./api/routes');

if (!process.env.NODE_ENV) throw new Error('you need to define process.env.NODE_ENV');
require('dotenv').config({
    path: `./config/config.${process.env.NODE_ENV}.env`,
});

const {
    PORT,
    HOST,
    CORSWHITELIST,
    MONGO_USERNAME,
    MONGO_PASSWORD,
} = process.env;

const port = PORT || 8080;
const host = HOST || 'localhost';
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const corsOptions = {
    origin(origin, callback) {
        if (JSON.parse(CORSWHITELIST).includes(origin) || !origin) {
            callback(null, true);
            return;
        }
        callback(new Error('Not allowed by CORS'));
    },
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

app.use(routes);

app.listen(port, host, async () => {
    console.log(`Server is running on: ${host}:${port}`);

    // mongoose instance
    mongoose.Promise = global.Promise;
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {
        user: MONGO_USERNAME,
        pass: MONGO_PASSWORD,
        dbName: 'commercial_reports',
    });
    console.log('Server connected to db');
});

module.exports = app;
