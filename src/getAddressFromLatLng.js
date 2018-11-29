"use strict";

const rp = require("request-promise");

const REVERSE_CODING_KEY = process.env.REVERSE_CODING_KEY;
const REVERSE_CODING_URL = process.env.REVERSE_CODING_URL;

exports.getAddressFromLatLng = async (lat, lng) => {
  const query = formatQuery(lat, lng);
  const response = await rp.get({ url: query, json: true});
  if (!response.display_name) throw "display_name is missing";
  if (!response.geojson) throw "geojson is missing";
  return {
    address: response.display_name,
    geoJson: response.geojson,
  };
};

const formatQuery = (lat, lng) => (
  `${REVERSE_CODING_URL}` +
  `?key=${REVERSE_CODING_KEY}` +
  `&format=json` +
  `&lat=${lat}` +
  `&lon=${lng}` +
  `&zoom=18` +
  `&addressdetails=1` +
  `&polygon_geojson=1`
);
