const yargs = require("yargs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const getForecast = (city) =>
  geocode(city, (error, { latitude, longtitude, location } = {}) => {
    if (error) return console.log(error);
    forecast(latitude, longtitude, (error, { temperature, feelslike }) => {
      if (error) return console.log(error);
      console.log(location);
      console.log(`It is currently ${temperature}. It feels like ${feelslike}`);
    });
  });

yargs.command({
  command: "enter",
  describe: "enter the city name",
  builder: {
    city: {
      describe: "the city name",
      type: "string"
    }
  },
  handler: function (argv) {
    const { city } = argv;
    getForecast(city);
  }
});

yargs.parse();
