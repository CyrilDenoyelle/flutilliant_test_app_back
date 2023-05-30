# Backend for "commercial reports app"

Platform for commercials to fill out a report form after each visit to a customer.
The commercial director of the company has an interface allowing him to visualize by a graph the sales and turnover achieved by his team.

## Install

    $ npm install

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

## Running the project

    $ npm run dev
