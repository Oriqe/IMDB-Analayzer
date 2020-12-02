var express = require("express");
var path = require("path");
const fs = require('fs')
const write_stream = fs.createWriteStream('resources/data.js')
var routes = require("./routes")
