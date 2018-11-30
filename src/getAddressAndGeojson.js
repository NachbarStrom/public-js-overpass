"use strict";

const rp = require("request-promise");

const REVERSE_CODING_KEY = process.env.REVERSE_CODING_KEY;
const REVERSE_CODING_URL = process.env.REVERSE_CODING_URL;
const REVERSE_CODING_LATENCY_DESCRIPTOR = "Latency of reverse geocoding service";

const getAddressAndGeojsonFromLatLng = async (lat, lng) => {
  const query = formatQuery(lat, lng);
  const response = await rp.get({ url: query, json: true});
  const address = response.display_name !== undefined ? response.display_name : "";
  const geoJson = response.geojson !== undefined ? response.geojson : null;
  return { address, geoJson };
};

const formatQuery = (lat, lng) => {
  if (REVERSE_CODING_KEY === undefined) throw "REVERSE_CODING_KEY is undefined";
  if (REVERSE_CODING_URL === undefined) throw "REVERSE_CODING_URL is undefined";
  return (
    `${REVERSE_CODING_URL}` +
    `?key=${REVERSE_CODING_KEY}` +
    `&format=json` +
    `&lat=${lat}` +
    `&lon=${lng}` +
    `&zoom=18` +
    `&addressdetails=1` +
    `&polygon_geojson=1`
)};

const reqResWrapper = async (req, res) => {
  const { lat, lng } = req.params;
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
