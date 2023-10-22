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

router.post('/' , 
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

module.exports = router;