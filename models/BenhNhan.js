const mongoose = require('mongoose');

const BenhNhanSchema = new mongoose.Schema({
    hoten: {
        type: String,
        required: true
    },
    sodienthoai: {
        type: String,
        required: true
    },
    ngaysinh: {
        type: Date,
        default: Date.now
    },
    gioitinh: {
        type: Number,
        required: true
    }
});

module.exports = BenhNhan = mongoose.model('benhnhan', BenhNhanSchema);