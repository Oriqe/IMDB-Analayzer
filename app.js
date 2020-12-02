var express = require("express");
var path = require("path");
const fs = require('fs')
const write_stream = fs.createWriteStream('resources/data.js')
var routes = require("./routes")
var app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'resources')))
app.set("views", path.join(__dirname, "views"));
app.use(routes)

fetch = require("node-fetch");


async function scraping() {
    console.log("Please wait for a couple of seconds until the data-scraping is completed")
    
      const address = await fetch("https://docs.google.com/spreadsheets/d/1--FMdHdg_fnfBvebZwngB1pukZCrlPO5frcVazuP58Q/edit", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "max-age=0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "x-client-data": "CIm2yQEIorbJAQjBtskBCKmdygEIl6zKAQjquMoBCK3BygEIrMfKAQj2x8oBCLTLygEI3NXKAQjwl8sBCJeaywEYisHKAQ=="
        },
        "referrer": "https://docs.google.com/spreadsheets/d/1--FMdHdg_fnfBvebZwngB1pukZCrlPO5frcVazuP58Q/edit",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      })
      .then((response) => response.text())
  
    }
  


scraping.then(data => {
    app.listen(app.get("port"), function(){
      console.log('Finished scraping and writing, The server is available at http://127.0.0.1:3000/')
    })
  })
