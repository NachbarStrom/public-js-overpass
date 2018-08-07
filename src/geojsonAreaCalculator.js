"use strict";

const geojsonArea = require("@mapbox/geojson-area");

exports.calculateBuildingsAreas = function(geojson) {
  const buildings = geojson.features;
  return buildings.map(
    building => ({
      area: geojsonArea.geometry(building.geometry),
      id: building.id,
    })
  );
};
