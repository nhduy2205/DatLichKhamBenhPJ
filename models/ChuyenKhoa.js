const mongoose = require('mongoose');

const ChuyenKhoaSchema = new mongoose.Schema({
    tenchuyenkhoa: {
        type: String,
        required: true
    },
    ghichu: {
        type: String
    }
});
module.exports = ChuyenKhoa = mongoose.model('chuyenkhoa', ChuyenKhoaSchema)