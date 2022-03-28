const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    reporter_user: {
        type: String,
        required: true
    },
    reported_user: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    context: {
        type: String,
    },
    resolved: {
        type: Boolean,
        default: false
    },
    resolved_by: {
        type: String,
        default: ''
    }
})

const Report = mongoose.model('Report', ReportSchema)

module.exports = { Report }
