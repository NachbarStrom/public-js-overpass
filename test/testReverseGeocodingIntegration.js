const expect = require("chai").expect;
const rp = require("request-promise");
const _ = require("lodash");

const TEST_HOUSE = require("./testGetAddressAndGeojson").TEST_HOUSE;
const PAYLOAD = { lat: TEST_HOUSE.lat, lng: TEST_HOUSE.lng };
const SERVER_URL = "http://localhost:3000/reverse-geocoding";

describe("The reverse geocoding endpoint", () => {
  it("returns the address and geoJson of the place", async () => {
    const options = { json: PAYLOAD };
    const response = await rp.get(SERVER_URL, options);
    expect(response.address).to.be.equal(TEST_HOUSE.address);
    expect(_.isEqual(response.geoJson, TEST_HOUSE.geoJson)).to.be.true;
  });
});
