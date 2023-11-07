const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const PhongKhamBenh = require('./../../models/PhongKhamBenh');
const {check, validationResult} = require('express-validator');
const KhungGioKham = require('../../models/KhungGioKham');

// @route GET api/loaiphongkham
// @desc TEST route
// @access Public
router.get('/',async (req, res) => {
    try{
        const phongkhambenh = await PhongKhamBenh.find();
        res.status(200).json(phongkhambenh);
    }catch(err){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/loaiphongkham
// @desc them loai phong kham
// @access Public

router.post('/' ,[check('tenphong', 'tenphong is required').not().isEmpty()],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {tenphong, chuyenkhoa, trangthai, dongiakham, thoigian} = req.body;
    try {
        let phongkhambenh = await PhongKhamBenh.findOne({tenphong});
        if(phongkhambenh){
            res.status(400).json({errors: [{msg: 'Phong kham da ton tai'}]})
        }

        phongkhambenh = new PhongKhamBenh({
            tenphong, 
            chuyenkhoa: chuyenkhoa,
            trangthai,
            dongiakham,
            thoigian
        });

        await phongkhambenh.save();
        res.send('Them phong kham than cong');
    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});

// them khung gio kham

router.post('/themkhunggiokham' ,[check('khunggiokham', 'khunggiokham is required').not().isEmpty()],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {khunggiokham, giatri, giobatdau} = req.body;
    try {
        let khunggiokhamP = await KhungGioKham.findOne({khunggiokham});
        if(khunggiokhamP){
            res.status(400).json({errors: [{msg: 'Phong kham da ton tai'}]})
        }

        khunggiokhamP = new KhungGioKham({
            khunggiokham,
            giatri,
            giobatdau
        });

        await khunggiokhamP.save();
        res.send('them thanh cong');
    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});

// get khun gio kham
router.get('/laykhunggiokham',async (req, res) => {
    try{
        const khunggiokham = await KhungGioKham.find();
        res.status(200).json(khunggiokham);
    }catch(err){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;