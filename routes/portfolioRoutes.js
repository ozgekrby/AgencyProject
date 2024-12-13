const express = require('express');
const { getAllPortfolios, getPortfolio, createPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');
const router = express.Router();

router.get('/', getAllPortfolios);
router.get('/portfolios/create', (req, res) => res.render('add'));
router.get('/portfolios/:id', getPortfolio);
router.post('/portfolios', createPortfolio);
router.put('/portfolios/:id', updatePortfolio);
router.delete('/portfolios/:id', deletePortfolio);

module.exports = router;