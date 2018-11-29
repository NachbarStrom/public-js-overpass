"use strict";

const queryOverpass = require("query-overpass");
const geojsonAreaCalculator = require("./geojsonAreaCalculator");
const overpassUrl = process.env.OVERPASS_URL;

const OVERPASS_LATENCY_DESCRIPTOR = "Latency of Overpass service";

function getFormattedQuery(latitude, longitude, radius) {
  return `[out:json];
    (
    rel[building](around:${radius},${latitude},${longitude});
    way[building](around:${radius},${latitude},${longitude});
    );
    out geom;`;
}

exports.getRoofsPolygons = function (req, res) {
  const coords = req.body;
  const defaultRadiusInMeters = 5;
  const query = getFormattedQuery(coords.lat, coords.lon, defaultRadiusInMeters);
  const options = { overpassUrl };
  console.time(OVERPASS_LATENCY_DESCRIPTOR);
  queryOverpass(query, function (error, geoJson) {
    console.timeEnd(OVERPASS_LATENCY_DESCRIPTOR);
    if (error) {
      res.json(error);
    }
    const response = {
      geoJson: geoJson,
      areas: geojsonAreaCalculator.calculateBuildingsAreas(geoJson),
    };
    res.json(response);
  }, options);
};
