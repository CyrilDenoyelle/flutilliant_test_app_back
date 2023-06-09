const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    customerAddress: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerContact: {
        type: String,
        required: true,
    },
    commercialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    visitDate: {
        type: Date,
        required: true,
    },
    reportBody: {
        type: String,
        required: true,
    },
    orderedItems: {
        type: Number,
        required: true,
    },
    revenue: {
        type: Number,
        required: true,
    },
    nextVisitDate: {
        type: Date,
        required: true,
    },
    nextVisitItems: {
        type: Number,
        required: true,
    },
    nextVisitRevenue: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    collection: 'reports',
}, {
    timestamps: true,
});

[
    'count',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
].forEach((type) => {
    reportSchema.pre(type, function excludeIsDeleted(next) {
        this.where({ isDeleted: false });
        next();
    });
});

module.exports = mongoose.model('Report', reportSchema);
