const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
mongoose.connect("mongodb://127.0.0.1:27017/verse");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const cluster_schema = {
  title: String,
  cluster_id: Number,
};

const agglo_bert = mongoose.model("agglo_bert", cluster_schema);
const agglo__t_5 = mongoose.model("agglo_t_5", cluster_schema);
const kmean_bert = mongoose.model("kmean_bert", cluster_schema);
const kmean_t_5 = mongoose.model("kmean_t_5", cluster_schema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/p1.html");
});

app.get("/agglo_bert", function (req, res) {
  res.sendFile(__dirname + "/AB.html");
});

app.get("/agglo_t_5", function (req, res) {
  res.sendFile(__dirname + "/AT5.html");
});

app.get("/kmean_bert", function (req, res) {
  res.sendFile(__dirname + "/KMB.html");
});

app.get("/kmean_t_5", function (req, res) {
  res.sendFile(__dirname + "/KMT5.html");
});

app.post("/",function(req,res){
     const dir=req.body.ID;
     res.redirect("/"+dir);
});

app.post("/agglo_bert", function (req, res) {
    agglo_bert
      .find({ cluster_id: req.body.ID })
      .then(function (data) {
        res.render("article", { data: data, pid:req.body.ID, heading: "Agglomerative clustering on BERT Embeddings", src: "agglo_bert" ,url:"https://drive.google.com/file/d/1xR7foDG4O2npQGYuviXTrOCo2pmqw98o/view?usp=sharing"});
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send("Error occurred"); // send an error response
      });
  });
  

  app.post("/agglo_t_5", function (req, res) {
    agglo__t_5
      .find({ cluster_id: req.body.ID })
      .then(function (data) {
          res.render("article", { data: data,  pid:req.body.ID,heading: "Agglomerative clustering on T5-small Embeddings", src: "agglo_t_5",url:"https://drive.google.com/file/d/1uBh2gby57x3K1lbVgqgFRdmXY-KXney2/view?usp=sharing" });
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send("Error occurred"); // send an error response
      });
  });
  
  app.post("/kmean_bert", function (req, res) {
    kmean_bert
      .find({ cluster_id: req.body.ID })
      .then(function (data) {
          res.render("article", { data: data, pid:req.body.ID,heading: "K-Means clustering on BERT Embeddings", src: "kmean_bert",url:"https://drive.google.com/file/d/1vC96iBk4hkL10Wd6SCp2YmrbfCvtu5H9/view?usp=sharing" });
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send("Error occurred"); // send an error response
      });
  });
  
  app.post("/kmean_t_5", function (req, res) {
    kmean_t_5
      .find({ cluster_id: req.body.ID })
      .then(function (data) {
          res.render("article", { data: data,  pid:req.body.ID,heading: "K-Means clustering on T5-small Embeddings", src: "kmean_t_5",url:"https://drive.google.com/file/d/14IXUjVIgHQhn1VCpDBV5pp5KGpuNXmA_/view?usp=sharing" });
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send("Error occurred"); // send an error response
      });
  });
  

app.listen(3000, function (req, res) {
  console.log("server started at port 3000");
});
