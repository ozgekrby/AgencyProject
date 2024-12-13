const express = require('express');
const { getAllPortfolios, getPortfolio, createPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');
const router = express.Router();

router.get('/', getAllPortfolios);
router.get('/:id', getPortfolio);
router.post('/create', createPortfolio);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

module.exports = router;