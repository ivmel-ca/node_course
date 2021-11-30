const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
// by default, hbs looks into dir called 'views', below is a
// path to the arbitrary named dir
const viewsPath = path.join(__dirname, "../templates");

// enable handlebars to serve dynamic templates
app.set("view engine", "hbs");
// points hbs to look for dynamic pages in dir 'templates'
app.set("views", viewsPath);
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
  res.send(JSON.stringify({ temperature: "-20", location: "Calgary" }));
});

app.listen(3002, () => {
  console.log("Server is up on port 3002");
});
