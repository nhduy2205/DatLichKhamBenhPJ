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
    },
    bhyt: [{
        mathe: {
            type: String
        },
        thoihanthetu: {
            type: Date,
            default: null
        },
        thoihantheden: {
            type: Date,
            default: null
        }
    }]
});

module.exports = BenhNhan = mongoose.model('benhnhan', BenhNhanSchema);