const express = require("express");
const sorteoRoutes = require("./routes/sorteo.routes");
const bodyParser = require("body-parser");
const config = require("./config");
const mongoose = require("mongoose");

const db = config.connectionStrings.db.replace('<password>','user1');

mongoose.connect(db, {useNewUrlParser: true})
  .then(()=> {
    console.log('Connected to the db');
  })
  .catch((error)=>
  {
    console.log(error);
  });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, PUT, DELETE, OPTIONS");

    next(); 
});

app.use('/api/sorteo', sorteoRoutes);

module.exports = app;