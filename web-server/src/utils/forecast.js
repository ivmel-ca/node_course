const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9a44c279323d02a9634d8709ecf676f1&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Error | unable to connect to the weatherstack server!");
    } else if (!response.body.current) {
      callback("Error | no such location has been found!");
    } else {
      const current = response.body.current;

      callback(null, {
        temperature: current.temperature,
        feelslike: current.feelslike
      });
    }
  });
};

module.exports = forecast;
