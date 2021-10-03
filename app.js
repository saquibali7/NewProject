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
  FName: String,
  LNmae:String,
  Gender:String,
  Dob:String,
  Email: String,
  MoNumber: String,
  State: String,
  City:String,
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
    FName: req.body.firstName,
    LNmae:req.body.lastName,
    Gender:req.body.gender,
    Dob:req.body.dob,
    Email: req.body.email,
    MoNumber: req.body.moNumber,
    State: req.body.state,
    City:req.body.city,
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
