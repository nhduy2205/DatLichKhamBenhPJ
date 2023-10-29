const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const ThongTinBenhNhan = require('./../../models/ThongTinBenhNhan');
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
check('ngaysinh', 'sodienthoai is required').not().isEmpty(),
check('diachi', 'diachi is required').not().isEmpty()],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {benhnhan, hoten, ngaysinh, gioitinh, nghenghiep, diachi} = req.body;
    try {
        let thongtinbenhnhan = await ThongTinBenhNhan.findById(req.params.id);
        if(benhnhan){
            res.status(400).json({errors: [{msg: 'Benh nhan da nhap thong tin'}]})
        }

        thongtinbenhnhan = new ThongTinBenhNhan({
            benhnhan: req.params.id,
            hoten, 
            sodienthoai,
            ngaysinh,
            gioitinh,
            nghenghiep,
            diachi
        });
        await thongtinbenhnhan.save();
        res.status(200).send('Them thong tin benh nhan thanh cong');
    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});

module.exports = router;