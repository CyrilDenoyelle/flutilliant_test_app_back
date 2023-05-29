const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

const routes = require("./api/routes")

require('dotenv').config({
    path: `./config/config.${process.env.NODE_ENV}.env`
});

const {
    PORT,
    HOST,
    CORSWHITELIST,
    MONGO_USERNAME,
    MONGO_PASSWORD
} = process.env;

const port = PORT || 8080;
const host = HOST || 'localhost'
const app = express();

const corsOptions = {
    origin(origin, callback) {
        if (CORSWHITELIST.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

app.use(routes);

app.listen(port, async () => {
    console.log(`Server is running on port: ${port}`);

    // mongoose instance
    mongoose.Promise = global.Promise;
    await mongoose.connect(`mongodb://localhost:27017`, {
        user: MONGO_USERNAME,
        pass: MONGO_PASSWORD,
        dbName: 'commercial_reports'
    });
    console.log(`Server connected to db`);
});


module.exports = app;
