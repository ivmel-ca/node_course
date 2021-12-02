const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

if (weatherForm) {
  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = search.value;

    fetch(`http://localhost:3002/weather?city=${city}`)
      .then((resp) => resp.json())
      .then(
        ({
          location,
          forecastData: { temperature, feelslike } = {},
          error
        }) => {
          if (error) {
            return (messageOne.textContent = error);
          }

          messageOne.textContent = "";

          const msg = `Location: ${location}.
          The temperature is ${temperature}, it feels like ${feelslike}`;

          messageTwo.textContent = msg;
        }
      )
      .catch((err) => console.error(err));
  });
}
