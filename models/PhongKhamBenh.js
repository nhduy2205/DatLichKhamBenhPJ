const mongoose = require('mongoose');

const PhongKhamBenhSchema = new mongoose.Schema({
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
        default: 'controng'
    },
    dongiakham: {
        type: Number,
        default: 34500
    },
    thoigian: {
        type: Date,
        default: Date.now

    }
});
module.exports = PhongKhamBenh = mongoose.model('phongkhambenh', PhongKhamBenhSchema)