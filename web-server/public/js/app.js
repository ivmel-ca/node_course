console.log("client side javascript file is loaded");

fetch('http://localhost:3002/weather?city="kitchener"')
  .then((resp) => resp.json())
  .then((resp) => console.log(resp))
  .catch((err) => console.error(err));
