const mongoose = require('mongoose');

const ThongTinBenhNhanSchema = new mongoose.Schema({
    benhnhan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'benhnhan'
    },
    hoten: {
        type: String,
        required: true
    },
    ngaysinh: {
        type: Date,
        default: Date.now
    },
    gioitinh: {
        type: Boolean,
        default: true
    },
    nghenghiep: {
        type: String
    },
    diachi: {
        type: String,
        required: true
    },
    soBHYT: {
        type: String,
    },
    bhytNgayHieuLuc: {
        type: Date
    },
    bhytNgayHetHan: {
        type: Date
    }
});

module.exports = ThongTinBenhNhan = mongoose.model('thongtinbenhnha', ThongTinBenhNhanSchema);