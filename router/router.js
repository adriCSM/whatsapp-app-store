const express = require('express');
const router = express.Router();
const auth = require('../controller/auth.js');

/**GET REGISTRASI, LOGIN, REFRESHT TOKEN, LOGOUT, SENDEMAIL */

router.post('/wa/costumer', auth.sendWaCostumer);
router.post('/wa/admin', auth.sendWaAdmin);

module.exports = router;
