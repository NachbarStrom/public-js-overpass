"use strict";

const addErrorHandling = require("./errorHandling").addErrorHandling;
const bodyParser = require("body-parser");
const express = require('express');
const morgan = require("morgan");

const app = express();
app.use(morgan("common"));
app.use(bodyParser.json());

const routes = require("./routes");
routes(app);
addErrorHandling(app);

const port = process.env.PORT || 3000;
app.listen(port);

console.log('Overpass service server started on: ' + port);
console.log('Reverse geocoding service server started on: ' + port);
