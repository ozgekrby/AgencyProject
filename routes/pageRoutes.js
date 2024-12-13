const express = require('express');
const { getAddPage, getIndexPage, sendEmail } = require('../controllers/pageController');

const router = express.Router();

router.get('/', getIndexPage);
router.get('/add', getAddPage);
router.route('/contact').post(sendEmail);

module.exports = router;