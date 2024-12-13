const express = require('express');
const { getAddPage, getIndexPage } = require('../controllers/pageController');

const router = express.Router();

router.get('/', getIndexPage);
router.get('/add', getAddPage);


module.exports = router;