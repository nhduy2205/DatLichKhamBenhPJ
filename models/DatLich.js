const mongoose = require('mongoose');

const DatLichSchema = new mongoose.Schema({
    loaiphong: [
        {
            id_loaiphong: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'loaiphong'
            },
            dongia: {type: Number},
            thanhtien: {type: Number}
        }
    ],
    benhnhan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'benhnhan'
    },
    datkhamtungay: {
        type: Date,
        required: true 
    },
    datkhamdenngay:{
        type: Date,
        required: true
    },
    thanhtoan: [{
        loaithanhtoan:{
            type: String,
            default: 'ck'
        },
        trangthaithanhtoan: {
            type: String,
            default: 'no'
        }
    }],
    trangthaixacthuc: {
        type: String,
        default: 'no'
    }

});

module.exports = DatLich = mongoose.model('datlich', DatLichSchema);