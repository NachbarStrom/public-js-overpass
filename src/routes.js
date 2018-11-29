"use strict";

const cors = require("cors");

module.exports = function (app) {
  app.options("/roofs-polygons", cors());
  app.post("/roofs-polygons", cors(), require("./getRoofsPolygons").getRoofsPolygons);
  app.get("/reverse-geocoding", require("./getAddressAndGeojson").reqResWrapper)
};