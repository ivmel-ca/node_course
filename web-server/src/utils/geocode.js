const request = require("postman-request");
const encodeUrl = require("encodeurl");

const geocode = (address, callback) => {
  const encodedAddress = encodeUrl(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiaXZtZWwtY2EiLCJhIjoiY2tnODRrY3hiMDcydzJxbXlsc2J1Z2thOCJ9.5WWz8ohPVOCAsr9awcvRjg`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (!response.body.features.length) {
      callback("no location has been found!");
    } else {
      callback(null, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
