const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const BenhNhan = require('./../../models/BenhNhan');
const {check, validationResult} = require('express-validator');
// @route GET api/users
// @desc TEST route
// @access Public
router.get('/', (req, res) => res.send('benhnhan route'));

// @route post api/users
// @desc TEST route
// @access Public

router.post('/themthongtin' , 
[check('hoten', 'hoten is required').not().isEmpty(),
check('sodienthoai', 'sodienthoai is required').not().isEmpty(),
check('gioitinh', 'gioitinh is required').not().isEmpty()],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {hoten, sodienthoai, ngaysinh, gioitinh, bhyt} = req.body;
    try {
        let benhnhan = await BenhNhan.findOne({sodienthoai});
        if(benhnhan){
            res.status(400).json({errors: [{msg: 'Benh nhan da ton tai'}]})
        }

        benhnhan = new BenhNhan({
            hoten, 
            sodienthoai,
            ngaysinh,
            gioitinh,
            bhyt: bhyt
        });

        await benhnhan.save();
        res.send('Them benh nhan thanh cong');
    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});


// api đăng nhập => xác thực bằng số điện thoại

router.post('/dangnhap' , 
[check('sodienthoai', 'sodienthoai is required').not().isEmpty()],
async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {sodienthoai} = req.body;
    const maxacthuc = Math.floor(Math.random() * 1000000);
    try {
        let benhnhan = await BenhNhan.findOne({sodienthoai});
        if(benhnhan){
            // nếu bệnh nhân đã đăng ký sdt rồi thì đổi mã xác thực và lưu lại
            let benhnhan_update = await BenhNhan.findById(benhnhan.id);
            benhnhan_update.maxacthuc = maxacthuc;
            await benhnhan_update.save();
            benhnhan = benhnhan_update;
            res.json({ benhnhan });
        }else {
            benhnhan = new BenhNhan({
                sodienthoai,
                maxacthuc: String(maxacthuc)
            });
    
            await benhnhan.save();
            res.json({ benhnhan });
        }
    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});

// api đăng nhập => xác thực bằng số điện thoại

router.post('/xacthuc/:id' , 
[check('maxacthuc', 'maxacthuc is required').not().isEmpty()],
async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    const {maxacthuc} = req.body;

    try {
        let benhnhan = await BenhNhan.findById(req.params.id);
        if(benhnhan && benhnhan.maxacthuc == maxacthuc){            
           return res.status(200).json({ benhnhan });
        } 
        return res.status(400).send("Mã xác thực không đúng!");

    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});


module.exports = router;