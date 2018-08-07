const expect = require("chai").expect;
const request = require("request");

const apiUrl = "http://localhost:3000/roofs-polygons";
const payload = { json: { lat: 48.181185, lon: 11.612054 } };

describe("The server", () => {
  it("return polygons on call", testIsDone => {
    const expectedGeometryLength = 7;   // This particular house has seven vertices
    request.post(apiUrl, payload, (err, res, body) => {
      const geometryLength = body.geoJson.features[0].geometry.coordinates[0].length;
      expect(geometryLength).to.be.equal(expectedGeometryLength);
      testIsDone();
    });
  })
});

describe("The server", () => {
  it("returns an area for each building", testIsDone => {
    const payload = { json: { lat: 48.181185, lon: 11.612054 } };
    request.post(apiUrl, payload, (err, res, body) => {
      testNumBuildingsEqualsNumAreas(body);
      testEachBuildingHasACorrespondingArea(body);
      testIsDone();
    });
  })
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