const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const LoaiPhongKham = require('./../../models/LoaiPhongKham');
const {check, validationResult} = require('express-validator');


// @route GET api/loaiphongkham
// @desc TEST route
// @access Public
router.get('/',async (req, res) => {
    try{
        const loaiphongkham = await LoaiPhongKham.find();
        res.status(200).json(loaiphongkham);
    }catch(err){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/loaiphongkham
// @desc them loai phong kham
// @access Public

router.post('/' ,[check('tenloaiphongkham', 'tenloaiphongkham is required').not().isEmpty()],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {tenloaiphongkham, dichvu, ghichu, thoigian} = req.body;
    try {
        let loaiphongkham = await LoaiPhongKham.findOne({tenloaiphongkham});
        if(loaiphongkham){
            res.status(400).json({errors: [{msg: 'Phong kham da ton tai'}]})
        }

        loaiphongkham = new LoaiPhongKham({
            tenloaiphongkham, 
            dichvu: dichvu,
            ghichu,
            thoigian
        });

        await loaiphongkham.save();
        res.send('Them loai phong kham than cong');
    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});

module.exports = router;