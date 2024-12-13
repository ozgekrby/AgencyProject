const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const mongoose=require("mongoose");
const portfolioRoutes = require("./routes/portfolioRoutes");
const pageRoutes = require("./routes/pageRoutes");
const bodyParser = require("body-parser");
require('dotenv').config();
//TEMPLATE ENGINE
app.set("view engine","ejs")
//Middlewares
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:["POST","GET"]
}))
// Connect DB
const connectWithRetry = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Database connection error:", err);
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectWithRetry, 5000); 
  }
};

connectWithRetry();
//Routes

app.use("/", pageRoutes);
app.use("/portfolio", portfolioRoutes);
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});