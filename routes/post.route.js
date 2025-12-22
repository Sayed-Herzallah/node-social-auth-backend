const router = require('express').Router();

const postconrol = require('../controllers/post.controller');
const postowner = require('../middlewares/postowner.middleware');
const outher = require('../middlewares/verfiytoken');

router.post('/', outher.valid, postconrol.createpost);

router.get('/', outher.valid, postconrol.getallposts);

router.get('/:id', outher.valid, postconrol.getpostbyid);

router.put('/:id', outher.valid, postowner.checkoutherofpost, postconrol.updatepost);

router.patch('/:id', outher.valid, postowner.checkoutherofpost, postconrol.updatepost);

router.delete('/:id', outher.valid, postowner.checkoutherofpost, postconrol.deletapost);

module.exports = router;
