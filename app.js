const express = require("express");
const app = express();
const mongoose=require("mongoose");
const portfolioRoutes = require("./routes/portfolioRoutes");
const bodyParser = require("body-parser");
//TEMPLATE ENGINE
app.set("view engine","ejs")
//Middlewares
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true })); 

// Connect DB
const connectWithRetry = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/agency_database');
    console.log("Connected to DB");
  } catch (err) {
    console.error("Database connection error:", err);
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectWithRetry, 5000); 
  }
};

connectWithRetry();
//Routes
app.use("/", portfolioRoutes);
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});