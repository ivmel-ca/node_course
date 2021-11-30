const path = require("path");
const express = require("express");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

app.use(express.static);

app.get("", (req, res) => {
  res.send("<h1>Weather</h1>");
});

app.get("/help", (req, res) => {
  res.send("Help page");
});

app.get("/about", (req, res) => {
  res.send("<h1>about page</h1>");
});

app.get("/weather", (req, res) => {
  res.send(JSON.stringify({ temperature: "-20", location: "Calgary" }));
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
