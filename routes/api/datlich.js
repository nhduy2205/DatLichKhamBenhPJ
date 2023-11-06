const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const ThongTinBenhNhan = require('./../../models/ThongTinBenhNhan');
const BenhNhan = require('./../../models/BenhNhan');
const DatLich = require('./../../models/DatLich');
const {check, validationResult} = require('express-validator');
const PhongKhamBenh = require('../../models/PhongKhamBenh');
const ChuyenKhoa = require('../../models/ChuyenKhoa');
const KhungGioKham = require('../../models/KhungGioKham');

// @route GET api/thongtinbenhnhan
// @desc TEST route
// @access Public
router.get('/all', async (req, res) => {
    try{
        
        const datlich = await DatLich.find();
        if(datlich){
             res.status(200).json(datlich);
        }else{
            res.status(400).send("Không tìm thấy dữ liệu");
        }
    }catch(err){
        res.status(500).send('Server Error');
    }
});

// api dat lich kham benh
router.post('/:id' , 
[check('ngaykham', 'ngaykham is required').not().isEmpty(),
check('khunggiokham', 'khunggiokham is required').not().isEmpty(),
check('hinhthucthanhtoan', 'hinhthucthanhtoan is required').not().isEmpty(),
check('chuyenkhoa', 'chuyenkhoa is required').not().isEmpty()],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {chuyenkhoa, trieuchung, ngaykham, khunggiokham, hinhthucthanhtoan, trangthaixacthuc} = req.body;
    // const sodienthoai = "";
    try {
        //let datlich = await DatLich.find
        let thongtinbenhnhan = await ThongTinBenhNhan.findById(req.params.id);
        // if(thongtinbenhnhan){
        //     res.json("bệnh nhân đã có thông tin");
        // }
        //let phongkhamP = await PhongKhamBenh.findById(phongkham);
        let chuyenkhoaP = await ChuyenKhoa.findById(chuyenkhoa);
        let phongkham = await PhongKhamBenh.findOne({chuyenkhoa:chuyenkhoa});
        console.log(phongkham);
        if(thongtinbenhnhan){
            let datlich = new DatLich({
                thongtinbenhnhan: thongtinbenhnhan._id,
                phongkham: phongkham._id,
                chuyenkhoa: chuyenkhoaP._id,
                trieuchung,
                tongtien: phongkham.dongiakham,
                ngaykham,
                khunggiokham,
                hinhthucthanhtoan,
                trangthaixacthuc 
            });
            await datlich.save();
            res.status(200).json(datlich._id);
        }else {
            res.status(400).send("dat lich khong thanh cong");
        }
    }catch(err){
        res.status(500).json({errors: [{msg: err}]});
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

// // lấy thông tinh đặt lịch theo ngày
// router.get('/laygiokhambenhdaduocdat' , 
// [check('ngaykham', 'ngaykham is required').not().isEmpty()],
// async (req, res) => {
//     // console.log(req.body);
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array()});
//     }
//     console.log(req.body);
//     const {ngaykham} = req.body;
    
//     try {
//         let datlich = await DatLich.find({ngaykham: ngaykham});
//         if(datlich && datlich.khunggiokham !== 0){
//             return res.status(200).send(datlich.khunggiokham);
//         }else{
//             return res.status(400).send("không tìm thấy!");
//         } 
//     }catch(err){
//         res.status(500).json({errors: [{msg: err.msg}]});
//     }
// });
module.exports = router;