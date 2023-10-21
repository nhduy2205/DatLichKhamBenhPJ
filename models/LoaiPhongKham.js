const mongoose = require('mongoose');


const LoaiPhongKhamSchema = new mongoose.Schema({
    tenloaiphongkham: {
        type: String,
        required: true
    },
    dongiakham: {
        type: Number,
        required: true
    },
    soluong: {
        type: Number,        
    },  
    bacsikham:{
        type: Object,
        ref: 'bacsi'
    },
    dichvu: {
        type: [String]
    },
    ghichu: {
        type: String
    },
    thoigian: {
        type: Date,
        default: Date.now
    }
})
module.exports = LoaiPhongKham = mongoose.model('loaiphongkham', LoaiPhongKhamSchema)