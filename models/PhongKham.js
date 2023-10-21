const mongoose = require('mongoose');

const PhongKhanSchema = new mongoose.Schema({
    tenphong: {
        type: String,
        required: true
    },
    loaiphong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'loaiphongkham'
    },
    trangthai: {
        type: String,
        default: 'Còn trống'
    },
    bacsikham:{
        type: Object,
        ref: 'bacsi'
    },
    thoigian: {
        type: Date,
        default: Date.now

    }
})
module.exports = PhongKham = mongoose.model('phongkham', PhongKhanSchema)