const expect = require("chai").expect;
const rp = require("request-promise");
const _ = require("lodash");

const TEST_HOUSE = require("./testGetAddressAndGeojson").TEST_HOUSE;
const SERVER_URL = "http://localhost:3000/reverse-geocoding";

describe("The reverse geocoding endpoint", () => {
  it("returns the address and geoJson of the place", async () => {
    const options = { json: { lat: TEST_HOUSE.lat, lng: TEST_HOUSE.lng } };
    const response = await rp.get(SERVER_URL, options);
    expect(response.address).to.be.equal(TEST_HOUSE.address);
    expect(_.isEqual(response.geoJson, TEST_HOUSE.geoJson)).to.be.true;
  });

  it("Informs me of the missing inputs", async () => {
    try {
      await rp.get(SERVER_URL);
    } catch (e) {
      const expectedMsg = "The required payload should have the format " +
        "'{ lat: 12.3, lng: 4.56 }'";
      expect(e.statusCode).to.be.equal(500);
      expect(e.error).to.be.equal(expectedMsg);
      return;
    }
    throw "A request with missing inputs did not throw an error";
  });

  it("Does not break when the location lies in the middle of the ocean.", async () => {
    const locationInTheOcean = { lat: 44.015657, lng: -18.615203 };
    const expectedAddress = "";
    const expectedGeojson = [];

    const options = { json: locationInTheOcean };
    const response = await rp.get(SERVER_URL, options);

    expect(response.address).to.be.equal(expectedAddress);
    expect(_.isEqual(response.geoJson, expectedGeojson)).to.be.true;
  });
});
