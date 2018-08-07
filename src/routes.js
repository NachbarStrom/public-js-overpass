"use strict";

const cors = require("cors");

module.exports = function (app) {
  const controller = require("./controller");

  app.options("/roofs-polygons", cors());
  app.post("/roofs-polygons", cors(), controller.getRoofsPolygons);
};