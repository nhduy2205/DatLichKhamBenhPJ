const mongoose = require('mongoose');

const BenhNhanSchema = new mongoose.Schema({
    sodienthoai: {
        type: String,
        required: true
    },
    maxacthuc: {
        type: String
    }
});

module.exports = BenhNhan = mongoose.model('benhnhan', BenhNhanSchema);