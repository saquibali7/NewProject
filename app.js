const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/registrationForm');

const formSchema = {
  FullName: String,
  Email: String,
  MoNumber: String,
  Address: String
};

const Form = mongoose.model("Form", formSchema);


app.get("/", function(req, res){
  res.render("home");
});

app.get("/donate", function(req, res){
  res.render("donate");
});


app.get("/join", function(req, res){
  res.render("join");
});

app.post("/join", function(req, res) {
  const form = new Form({
    FullName: req.body.fullName,
    Email: req.body.email,
    MoNumber: req.body.moNumber,
    Address: req.body.address
  });

  form.save(function(err) {
    if(!err) {
      res.redirect("/");
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started");
});
