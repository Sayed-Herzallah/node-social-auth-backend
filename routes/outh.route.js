const router = require('express').Router();
const outhcontrol = require('../controllers/othur.controller');
const verifytokenmiddle = require('../middlewares/verfiytoken');

router.post('/register',outhcontrol.register);
router.post('/login',outhcontrol.login);
router.get('/confirm-email', verifytokenmiddle.valid, outhcontrol.confirmEmail);
router.post('/request-reset', outhcontrol.requestReset);
router.post('/reset-password', verifytokenmiddle.valid, outhcontrol.resetPassword);

module.exports=router
