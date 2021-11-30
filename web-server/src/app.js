const path = require("path");
const express = require("express");

console.log("__dirname: ", __dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  res.send(JSON.stringify({ temperature: "-20", location: "Calgary" }));
});

app.listen(3002, () => {
  console.log("Server is up on port 3002");
});
