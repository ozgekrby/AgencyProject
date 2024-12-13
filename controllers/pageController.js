const Portfolio = require("../models/Portfolio");

exports.getIndexPage = async (req, res) => {
    try {
        const portfolios = await Portfolio.find({}).sort('-dateCreated');
        console.log(portfolios); 
        res.status(200).render('index', {page_name:"index", portfolios });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

exports.getAddPage = async (req, res) => {
  try {
    res.status(200).render('add',{page_name:"add" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};




