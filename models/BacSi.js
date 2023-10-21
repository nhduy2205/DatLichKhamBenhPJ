const mongoose = require('mongoose');

const BacSiSchema = new mongoose.Schema({
    hotenbacsi: {
        type: String,
        required: true
    },
    chuyenkhoa: {
        type: String,
        required: true
    },
    chuchihanhnghe: {
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
    ghichu: {
        type: String
    }
});

module.exports = BacSi = mongoose.model('bacsi', BacSiSchema);