const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const ChuyenKhoa = require('./../../models/ChuyenKhoa');
const {check, validationResult} = require('express-validator');

// @route GET api/chuyenkhoa
// @desc TEST route
// @access Public
router.get('/',async (req, res) => {
    try{
        const chuyenkhoa = await ChuyenKhoa.find();
        res.status(200).json(chuyenkhoa);
    }catch(err){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// get chuyen khoa theo id

router.get('/:id',async (req, res) => {
    try{
        const chuyenkhoa = await ChuyenKhoa.findById(req.params.id);
        res.status(200).json(chuyenkhoa);
    }catch(err){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/loaiphongkham
// @desc them loai phong kham
// @access Public

router.post('/themchuyenkhoa' ,[check('tenchuyenkhoa', 'tenphong is required').not().isEmpty()],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {tenchuyenkhoa, ghichu} = req.body;
    console.log(req.body);
    try {
        let chuyenkhoa = await ChuyenKhoa.findOne({tenchuyenkhoa});
        if(chuyenkhoa){
            res.status(400).json({errors: [{msg: 'chuyen khoa da ton tai'}]})
        }

        chuyenkhoa = new ChuyenKhoa({
            tenchuyenkhoa,
            ghichu
        });

        await chuyenkhoa.save();
        res.send('Them chuyen khoa thanh cong');
    }catch(err){
        res.status(500).json({errors: [{msg: err.msg}]});
    }
});

module.exports = router;