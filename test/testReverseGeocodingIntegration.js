const expect = require("chai").expect;
const rp = require("request-promise");
const _ = require("lodash");

const TEST_HOUSE = require("./testGetAddressAndGeojson").TEST_HOUSE;
const SERVER_URL = "http://localhost:3000/reverse-geocoding";

describe("The endpoint '/reverse-geocoding'", () => {
  it("returns the address and geoJson of the place", async () => {
    const url = completeQuery(TEST_HOUSE.lat, TEST_HOUSE.lng);
    const response = await rp.get(url, { json: true });
    expect(response.address).to.be.equal(TEST_HOUSE.address);
    expect(_.isEqual(response.geoJson, TEST_HOUSE.geoJson)).to.be.true;
  });

  it("Informs me of the missing inputs", async () => {
    try {
      await rp.get(SERVER_URL);
    } catch (e) {
      expect(e.statusCode).to.be.equal(404);
      return;
    }
    throw "A request with missing inputs did not throw an error";
  });

  it("Does not break when the location lies in the middle of the ocean.", async () => {
    const locationInTheOcean = { lat: 44.015657, lng: -18.615203 };
    const expectedAddress = "";
    const expectedGeojson = null;

    const url = completeQuery(locationInTheOcean.lat, locationInTheOcean.lng);
    const response = await rp.get(url, { json: true });

    expect(response.address).to.be.equal(expectedAddress);
    expect(_.isEqual(response.geoJson, expectedGeojson)).to.be.true;
  });
});

const completeQuery = (lat, lng) => SERVER_URL + `/lat=${lat}&lng=${lng}`;
