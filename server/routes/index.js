const express = require('express');
const router = express.Router();

router.use('/lead', require('./lead'));

module.exports = router;