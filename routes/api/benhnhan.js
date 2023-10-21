const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

// @route GET api/users
// @desc TEST route
// @access Public
router.get('/', (req, res) => res.send('benhnhan route'));

module.exports = router;