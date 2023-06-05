# Backend for "commercial reports app"

Platform for commercials to fill out a report form after each visit to a customer.
The commercial director of the company has an interface allowing him to visualize by a graph the sales and turnover achieved by his team.

## Install

    npm install

## Configure app

Rename `/config/config.dev.env.example` to remove .example
then edit it with your settings. You will need:

- CORSWHITELIST is the lsit of url acepted by cros origin resource sharing;
- HOST the host you want your server to run on;
- PORT of said server;
- MONGO_HOST your mongodb host
- MONGO_PORT your mongodb port
- SECRET_JWT_CODE is the encryption key for jwt toekns
- ACCESS_TOKEN_EXPIRESIN is a duration in second (3600 is one hour)

## Running development server

If you use mongodb in local:

    mongod [--auth] --dbpath "C:\Users\{UserName}\Path\to\Mongodb\data\db"

(with --auth only if you've allready set up admin and users in mongodb)

Set NODE_ENV to dev

    $Env:NODE_ENV="dev"

Run the dev script

    npm run dev

## Running the tests

Same if you have mongodb in local (don't forget to change the port to anithing else than 27017)

    mongod --port {TEST_DB_PORT} --dbpath "C:\Users\{UserName}\Path\to\Mongodb\data\testDb"

Run the test script (don't forget to stop the dev server if its on the same port)

    npm run test

## add admin to mongodb

https://www.mongodb.com/docs/v2.6/tutorial/add-user-administrator/
