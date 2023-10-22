const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const PhongKhamBenh = require('./../../models/PhongKhamBenh');
const {check, validationResult} = require('express-validator');

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
    const {tenphong, loaiphong, trangthai, dongiakham, thoigian} = req.body;
    try {
        let phongkhambenh = await PhongKhamBenh.findOne({tenphong});
        if(phongkhambenh){
            res.status(400).json({errors: [{msg: 'Phong kham da ton tai'}]})
        }

        phongkhambenh = new PhongKhamBenh({
            tenphong, 
            loaiphong: loaiphong,
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

module.exports = router;