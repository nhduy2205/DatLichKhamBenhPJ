const mongoose = require('mongoose');

const BenhNhanSchema = new mongoose.Schema({
    hoten: {
        type: String
    },
    sodienthoai: {
        type: String
    },
    ngaysinh: {
        type: Date,
        default: Date.now
    },
    gioitinh: {
        type: Number
    }
});

module.exports = BenhNhan = mongoose.model('benhnhans', BenhNhanSchema);