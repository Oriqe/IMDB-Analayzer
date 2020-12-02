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

}



scraping.then(data => {
    app.listen(app.get("port"), function(){
      console.log('Finished scraping and writing, The server is available at http://127.0.0.1:3000/')
    })
  })
