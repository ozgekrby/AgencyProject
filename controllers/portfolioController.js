const Portfolio = require('../models/Portfolio');
const fs = require('fs');


exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({}).sort('-dateCreated');
    console.log(portfolios); 
    res.status(200).render('index', { portfolios });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.status(200).render('portfolio', { portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.createPortfolio = async (req, res) => {
  try {
    const uploadDir = 'public/uploads';


    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

    uploadedImage.mv(uploadPath, async () => {
      await Portfolio.create({
        ...req.body,
        image: '/uploads/' + uploadedImage.name,
      });
      res.status(201).redirect('/');
    });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ _id: req.params.id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    portfolio.title = req.body.title;
    portfolio.description = req.body.description;
    await portfolio.save();

    res.status(200).redirect(`/portfolios/${req.params.id}`);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ _id: req.params.id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    let deletedImage = __dirname + '/../public' + portfolio.image;

    if (fs.existsSync(deletedImage)) {
      fs.unlinkSync(deletedImage);
    }

    await Portfolio.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/');
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};