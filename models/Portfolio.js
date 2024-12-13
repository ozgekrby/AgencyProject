const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  });
const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;