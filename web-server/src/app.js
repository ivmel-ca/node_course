const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const getForecast = (city, res) =>
  geocode(city, (error, { latitude, longtitude, location } = {}) => {
    if (error)
      return res.send({
        error
      });
    forecast(latitude, longtitude, (error, forecastData) => {
      if (error)
        return res.send({
          error
        });
      return res.send(
        JSON.stringify({
          location,
          forecastData
        })
      );
    });
  });

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
// by default, hbs looks into dir called 'views', below is a
// path to the arbitrary named dir
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// enable handlebars to serve dynamic templates
app.set("view engine", "hbs");
// points hbs to look for dynamic pages in dir 'templates'
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// serve static files
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ivan Melnychenko"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Ivan Melnychenko"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Ivan Melnychenko"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.city) {
    return res.send({
      error: "city must be provided"
    });
  }

  getForecast(req.query.city, res);
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("help-four-o-four", {
    title: "404 page not found",
    error_msg: "Help article not found.",
    name: "Ivan Melnychenko"
  });
});

app.get("*", (req, res) => {
  res.render("page-not-found", {
    title: "404 page not found",
    error_msg: "This page doesn't exist.",
    name: "Ivan Melnychenko"
  });
});

app.listen(3002, () => {
  console.log("Server is up on port 3002");
});
