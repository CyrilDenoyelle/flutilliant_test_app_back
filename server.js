const express = require('express');
const cors = require('cors');

require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 8080;
const { CORSWHITELIST } = process.env;

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

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
