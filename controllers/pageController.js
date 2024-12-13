const Portfolio = require("../models/Portfolio");
const nodemailer = require('nodemailer');
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

exports.sendEmail = async (req, res) => {
  const outputMessage = `
    <h1>Mail Details </h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Email: ${req.body.phone}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
  `;

  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let info = await transporter.sendMail({
      from: '"Agency Project Contact Form" <no-reply@agency.com>',
      to: 'test@example.com',
      subject: 'Agency Project Contact Form New Message ✔',
      html: outputMessage,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.status(200).redirect('/');
  } catch (error) {
    res.status(200).redirect('/');
  }
};





