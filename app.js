const express = require("express");
const app = express();

//TEMPLATE ENGINE
app.set("view engine","ejs")
//Middlewares
app.use(express.static("public"))
//Routes
app.get("/", (req, res) => {
    res.status(200).render("index",{
        page_name:"index"
      })
});
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});