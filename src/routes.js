"use strict";

const cors = require("cors");

module.exports = function (app) {
  app.options("/roofs-polygons", cors());
  app.post("/roofs-polygons", cors(), require("./getRoofsPolygons").getRoofsPolygons);

  app.options("/reverse-geocoding", cors());
  app.get("/reverse-geocoding/lat=:lat&lng=:lng", cors(), require("./getAddressAndGeojson").reqResWrapper);
};