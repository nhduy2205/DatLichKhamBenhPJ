const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const ThongTinBenhNhan = require('./../../models/ThongTinBenhNhan');
const BenhNhan = require('./../../models/BenhNhan');
const {check, validationResult} = require('express-validator');
// @route GET api/thongtinbenhnhan
// @desc TEST route
// @access Public
router.get('/', (req, res) => res.send('thongtinbenhnhan route'));

// @route post api/thongtinbenhnhan
// @desc TEST route
// @access Public

router.post('/themthongtinbenhnhan/:id' , 
[check('hoten', 'hoten is required').not().isEmpty(),
check('diachi', 'diachi is required').not().isEmpty()],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {hoten, ngaysinh, gioitinh, nghenghiep, diachi} = req.body;
    // const sodienthoai = "";
    try {
        let thongtinbenhnhan = await ThongTinBenhNhan.findById(req.params.id);
        // if(thongtinbenhnhan){
        //     res.json("bệnh nhân đã có thông tin");
        // }
        let benhnhan = await BenhNhan.findById(req.params.id);
        // if(benhnhan){
        //     sodienthoai = benhnhan.sodienthoai;
        // }
        // thêm mới thông tin bệnh nhân
        thongtinbenhnhan = new ThongTinBenhNhan({
            benhnhan: benhnhan._id,
            hoten,
            ngaysinh,
            gioitinh,
            nghenghiep,
            diachi
        });
        await thongtinbenhnhan.save();
        res.status(200).send('Them thong tin benh nhan thanh cong');
    }catch(err){
        res.status(500).json({errors: [{msg: err}]});
    }
});

router.get('/all', async (req, res) => {
    try{
        const thongTinBenhNhan = await ThongTinBenhNhan.find();
        res.status(200).json(thongTinBenhNhan);
    }catch(err){
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;