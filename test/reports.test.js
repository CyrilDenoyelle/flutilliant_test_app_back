process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const cookie = require('cookie');

const Report = require('../api/models/reportModel');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Reports tests', async () => {
    const agent = chai.request.agent(server);

    const credentials = {
        email: 'truktestsendreport@gmail.com',
        password: 'truktest123',
    };

    let xsrfToken = null;
    let accessToken = null;

    // after all befor all tests we empty the test database
    before(async (done) => {
        // logging in the agent
        await agent.post('/users/signup')
            .send(credentials);

        await agent.post('/users/login')
            .send(credentials)
            .then((res) => {
                xsrfToken = res.body.xsrfToken;
                const cookies = cookie.parse(res.headers['set-cookie'][0]);
                accessToken = cookies.access_token;
            });

        await Report.deleteMany({});
        done();
    });
    after(async (done) => {
        await Report.deleteMany({});
        done();
    });

    describe('reports', () => {
        it('should create a new report', async (done) => {
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
            };

            const res = await agent.post('/reports')
                .set('x-xsrf-token', JSON.stringify(xsrfToken))
                .set('Cookie', `access_token=${accessToken}`)
                .send(report);

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

        let newReportId = null;
        it('should list all reports for the connected user', async (done) => {
            const report = {
                customer: {
                    address: 'test address',
                    name: 'test name',
                    contact: 'test contact',
                },
                visitDate: '2020-01-02',
                reportBody: 'test report body 2',
                orderedItems: 1,
                revenue: 2,
                nextVisitDate: '2020-01-02',
                nextVisitItems: 1,
                nextVisitRevenue: 2,
            };
            // create a second report
            await agent.post('/reports')
                .set('x-xsrf-token', JSON.stringify(xsrfToken))
                .set('Cookie', `access_token=${accessToken}`)
                .send(report);

            const res = await agent.get('/reports')
                .set('x-xsrf-token', JSON.stringify(xsrfToken))
                .set('Cookie', `access_token=${accessToken}`);

            res.should.have.status(200);
            res.body.data.reports.should.be.a('array').of.length(2);
            newReportId = res.body.data.reports[0]._id;

            done();
        });

        it('should update report', async (done) => {
            // update the second report
            await agent.put('/reports')
                .set('x-xsrf-token', JSON.stringify(xsrfToken))
                .set('Cookie', `access_token=${accessToken}`)
                .send({ reportId: newReportId, customerName: 'test name updated' });

            const res = await agent.get('/reports')
                .set('x-xsrf-token', JSON.stringify(xsrfToken))
                .set('Cookie', `access_token=${accessToken}`);

            res.should.have.status(200);
            done();
        });

        it('should delete report', async (done) => {
            // delete the second report
            await agent.delete(`/reports/${newReportId}`)
                .set('x-xsrf-token', JSON.stringify(xsrfToken))
                .set('Cookie', `access_token=${accessToken}`);

            const res = await agent.get('/reports')
                .set('x-xsrf-token', JSON.stringify(xsrfToken))
                .set('Cookie', `access_token=${accessToken}`);

            res.should.have.status(200);
            res.body.data.reports.should.be.a('array').of.length(1);
            done();
        });
    });
});
