const create = require('./create');
const findAll = require('./findAll');
const update = require('./update');
const deleteReport = require('./delete');

module.exports = {
    create,
    findAll,
    update,
    delete: deleteReport,
};
