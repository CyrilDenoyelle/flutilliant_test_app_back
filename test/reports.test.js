process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const cookie = require('cookie');

const Report = require('../api/models/reportModel');
const server = require('../server');

const should = chai.should();
const expect = chai.expect

chai.use(chaiHttp);

describe('Reports tests', () => {
    // after all befor all tests we empty the test database
    before(async (done) => {
        await Report.deleteMany({});
        done()
    });
    after(async (done) => {
        await Report.deleteMany({});
        done()
    });

    describe('create report and check in db', () => {
        it('should create a new report', async (done) => {

            const agent = chai.request.agent(server)

            const credentials = {
                email: 'truktestsendreport@gmail.com',
                password: 'truktest123',
            }

            const report = {
                customer: {
                    address: 'test address',
                    name: 'test name',
                    contact: 'test contact',
                },
                visitDate: '2020-01-01',
                reportBody: 'test report body',
                orderedItems: 1,
                revenue: 1,
                nextVisitDate: '2020-01-01',
                nextVisitItems: 1,
                nextVisitRevenue: 1,
            }

            await agent.post('/users/signup')
                .send(credentials);

            let token = ''
            let access_token = ''
            await agent.post('/users/login')
                .send(credentials)
                .then((res) => {
                    token = res.body.xsrfToken;
                    const cookies = cookie.parse(res.headers['set-cookie'][0]);
                    access_token = cookies['access_token'];

                });

            const res = await agent.post('/reports/create')
                .set('x-xsrf-token', JSON.stringify(token))
                .set('Cookie', `access_token=${access_token}`)
                .send(report)

            res.should.have.status(200);
            const { createdReport } = res.body.data;
            createdReport.should.have.property('customerAddress', report.customer.address);
            createdReport.should.have.property('customerName', report.customer.name);
            createdReport.should.have.property('customerContact', report.customer.contact);
            createdReport.should.have.property('visitDate', new Date(report.visitDate).toISOString());
            createdReport.should.have.property('reportBody', report.reportBody);
            createdReport.should.have.property('orderedItems', report.orderedItems);
            createdReport.should.have.property('revenue', report.revenue);
            createdReport.should.have.property('nextVisitDate', new Date(report.nextVisitDate).toISOString());
            createdReport.should.have.property('nextVisitItems', report.nextVisitItems);
            createdReport.should.have.property('nextVisitRevenue', report.nextVisitRevenue);

            done();
        });

    });

});
