//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

/* ---------------------------------------------------------------------------------------- */




app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  let cryptoSelect = req.body.crypto; // Identify the CRYPTO
  let fiatSelect = req.body.fiat ; // Identify the FIAT
  console.log(`=== ${cryptoSelect} | ${fiatSelect} ===`);

  request(`https://apiv2.bitcoinaverage.com/indices/global/ticker/${cryptoSelect}${fiatSelect}`, function(error, response, body){
    console.log(`=====================`);
    let data = JSON.parse(body) ;
    console.log(data.last);
    console.log(`=====================`);
    console.log(`status code: ${response.statusCode}`);
    console.log(`=====================`);

    res.write(`<p>The current date and time is ${data.display_timestamp}</p>`);
    res.write(`<h1>The price of ${cryptoSelect} is ${data.last}${fiatSelect}</h1>`);
  });


});




/* ---------------------------------------------------------------------------------------- */

app.listen(3000, function(req, res){
  console.log("Server started on port 3000.");
});
