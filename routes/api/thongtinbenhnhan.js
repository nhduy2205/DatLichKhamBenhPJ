const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const ThongTinBenhNhan = require('./../../models/ThongTinBenhNhan');
const BenhNhan = require('./../../models/BenhNhan');
const DatLich = require('./../../models/DatLich');
const {check, validationResult} = require('express-validator');
// @route GET api/thongtinbenhnhan
// @desc TEST route
// @access Public
//router.get('/', (req, res) => res.send('thongtinbenhnhan route'));

// api lấy thông tin bệnh nhân theo id 
router.get('/:id', async (req, res) => {
    try{
        const thongTinBenhNhan = await ThongTinBenhNhan.findById(req.params.id);
        if(thongTinBenhNhan){
             res.status(200).json(thongTinBenhNhan);
        }else{
            res.status(400).send("Không tìm thấy thông tin bệnh nhân theo ID");
        }
        
    }catch(err){
        res.status(500).send('Server Error');
    }
});
// @route post api/thongtinbenhnhan
// @desc TEST route
// @access Public
router.get('/all', async (req, res) => {
    try{
        
        const thongTinBenhNhan = await ThongTinBenhNhan.find();
        if(thongTinBenhNhan){
             res.status(200).json(thongTinBenhNhan);
        }else{
            res.status(400).send("Không tìm thấy thông tin bệnh nhân theo ID");
        }
    }catch(err){
        res.status(500).send('Server Error');
    }
});

router.post('/themthongtinbenhnhan/:id' , 
[check('hoten', 'hoten is required').not().isEmpty(),
check('diachi', 'diachi is required').not().isEmpty()],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {hoten, ngaysinh, gioitinh, nghenghiep, diachi, soBHYT, bhytNgayHieuLuc, bhytNgayHetHan} = req.body;
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
            diachi, 
            soBHYT, 
            bhytNgayHieuLuc,
            bhytNgayHetHan
        });
        await thongtinbenhnhan.save();
        res.status(200).send('Them thong tin benh nhan thanh cong');
    }catch(err){
        res.status(500).json({errors: [{msg: err}]});
    }
});



// api lấy thông tin bệnh nhân theo số điện thoại
router.post('/laytheosodienthoai' , 
[check('sodienthoai', 'sodienthoai is required').not().isEmpty()],
async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    const {sodienthoai} = req.body;
    try {
        let benhnhan = await BenhNhan.findOne({sodienthoai: sodienthoai});
        if(benhnhan){
            console.log(benhnhan.id);
            let thongTinBenhNhan = await ThongTinBenhNhan.find({benhnhan: benhnhan.id}); 
            if(thongTinBenhNhan){
                return res.status(200).json({ thongTinBenhNhan });
            }           
           else {
            return res.status(400).send("không tìm thấy!");
           }
        } 
        return res.status(400).send("không tìm thấy!");

    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});

// lấy thông tinh đặt lịch theo ngày
router.post('/laytheongay' , 
[check('ngaykham', 'ngaykham is required').not().isEmpty()],
async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    console.log(req.body);
    const {ngaykham} = req.body;
    
    try {
        let datlich = await DatLich.find({ngaykham: ngaykham});
        if(datlich){
            return res.status(200).json({ datlich });
        }else{
            return res.status(400).send("không tìm thấy!");
        } 
    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});

module.exports = router;