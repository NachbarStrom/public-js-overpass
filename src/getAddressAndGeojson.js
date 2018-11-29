"use strict";

const rp = require("request-promise");

const REVERSE_CODING_KEY = process.env.REVERSE_CODING_KEY;
const REVERSE_CODING_URL = process.env.REVERSE_CODING_URL;
const REVERSE_CODING_LATENCY_DESCRIPTOR = "Latency of reverse geocoding service";

const getAddressAndGeojsonFromLatLng = async (lat, lng) => {
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

const reqResWrapper = async (req, res) => {
  const { lat, lng } = req.body;
  try {
    console.time(REVERSE_CODING_LATENCY_DESCRIPTOR);
    const addressAndGeojson = await getAddressAndGeojsonFromLatLng(lat, lng);
    console.timeEnd(REVERSE_CODING_LATENCY_DESCRIPTOR);
    res.json(addressAndGeojson);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getAddressAndGeojsonFromLatLng, reqResWrapper };
