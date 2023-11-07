const mongoose = require('mongoose');

const DatLichSchema = new mongoose.Schema({
    thongtinbenhnhan:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thongtinbenhnhan'
    },
    phongkham: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'phongkhambenh'
    },
    chuyenkhoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chuyenkhoa'
    },
    trieuchung: {
        type: String
    },
    tongtien: {
        type: Number,
        required: true
    },
    ngaykham: {
        type: Date,
        required: true
    },
    tenchuyenkhoa: {
        type: String
    },
    tenkhunggiokham:{
        type: String
    },
    tenphongkham: {
        type: String
    },
    hoten: {
        type: String
    },
    ngaysinh: {
        type: Date
    },
    diachi:{
        type: String
    },
    theBHYT: {
        type: String
    },
    // chia ra 8 khung gio: sang 1 - 4, chieu 5 - 8
    // 1: 7 - 8h, 2: 8-9h, 3: 9-10h, 4: 10-11h, 5: 13-14h, 6: 14-15h, 7: 15-16h, 8: 16-17h
    khunggiokham: {
        type: Number,
        required: true
    },
    hinhthucthanhtoan: {
        type: String,
        required: true
    },
    trangthaixacthuc: {
        type: String,
        default: 'no'
    }
});

module.exports = DatLich = mongoose.model('datlich', DatLichSchema);