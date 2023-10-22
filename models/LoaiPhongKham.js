const mongoose = require('mongoose');


const LoaiPhongKhamSchema = new mongoose.Schema({
    tenloaiphongkham: {
        type: String,
        required: true
    },
    dichvu:[{
        tendichvu: {
            type: String,
            default: 'Công khám'
        },
        dongiadichvu: {
            type: Number,
            default: 55000
        }
    }],
    ghichu: {
        type: String
    },
    thoigian: {
        type: Date,
        default: Date.now
    }
})
module.exports = LoaiPhongKham = mongoose.model('loaiphongkham', LoaiPhongKhamSchema)