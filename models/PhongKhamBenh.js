const mongoose = require('mongoose');

const PhongKhamBenhSchema = new mongoose.Schema({
    tenphong: {
        type: String,
        required: true
    },
    chuyenkhoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chuyenkhoa'
    },
    trangthai: {
        type: String,
        default: 'controng'
    },
    dongiakham: {
        type: Number,
        default: 110000
    },
    thoigian: {
        type: Date,
        default: Date.now

    }
});
module.exports = PhongKhamBenh = mongoose.model('phongkhambenh', PhongKhamBenhSchema)