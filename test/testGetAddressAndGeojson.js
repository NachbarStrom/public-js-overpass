const expect = require("chai").expect;
const api = require("../src/getAddressAndGeojson");
const _ = require("lodash");

describe("The getAddressFromLatLng function", async () => {
  it("returns the address and geoJson of the place", async () => {
    const resp = await api.getAddressAndGeojsonFromLatLng(TEST_HOUSE.lat, TEST_HOUSE.lng);
    expect(resp.address).to.be.equal(TEST_HOUSE.address);
    expect(_.isEqual(resp.geoJson, TEST_HOUSE.geoJson)).to.be.true;
  });
});

const TEST_HOUSE = {
  lat: 52.5487429714954,
  lng: -1.81602098644987,
  address: "137, Pilkington Avenue, Sutton Coldfield, Birmingham, " +
    "West Midlands Combined Authority, West Midlands, England, " +
    "B72 1LH, UK",
  geoJson: {
    "type":"Polygon",
    "coordinates":[
      [
        [-1.8163514,52.548738],
        [-1.8163025,52.5487321],
        [-1.8162978,52.5487463],
        [-1.8162148,52.5487363],
        [-1.8161885,52.5488163],
        [-1.8163005,52.5488299],
        [-1.8163084,52.5488058],
        [-1.8163284,52.5488082],
        [-1.8163514,52.548738]
      ],
    ],
  },
};

exports.TEST_HOUSE = TEST_HOUSE;
