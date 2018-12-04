const expect = require("chai").expect;
const request = require("request");

const URL = "http://localhost:3000/roofs-polygons";
const PARTICULAR_HOUSE = {
  location: { lat: 48.181185, lon: 11.612054 },
  geometryLength: 7,
};

describe("The endpoint '/roofs-polygons'", () => {
  it("return polygons on call", testIsDone => {
    const payload = { json: PARTICULAR_HOUSE.location };
    request.post(URL, payload, (err, res, body) => {
      const geometryLength = body.geoJson.features[0].geometry.coordinates[0].length;
      expect(geometryLength).to.be.equal(PARTICULAR_HOUSE.geometryLength);
      testIsDone();
    });
  }).timeout(3000);

  it("returns an area for each building", testIsDone => {
    const payload = { json: PARTICULAR_HOUSE.location };
    request.post(URL, payload, (err, res, body) => {
      testNumBuildingsEqualsNumAreas(body);
      testEachBuildingHasACorrespondingArea(body);
      testIsDone();
    });
  }).timeout(3000);
});

const testNumBuildingsEqualsNumAreas = body => {
  const numOfBuildings = body.geoJson.features.length;
  const numOfAreas = body.areas.length;
  expect(numOfBuildings).to.be.equal(1);
  expect(numOfBuildings).to.be.equal(numOfAreas);
};

const testEachBuildingHasACorrespondingArea = body => {
  const onlyBuildingID = body.geoJson.features[0].id;
  const onlyAreaID = body.areas[0].id;
  expect(onlyBuildingID).to.be.equal(onlyAreaID);
};