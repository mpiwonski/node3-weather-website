const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationParagraph = document.querySelector("#location");
const weatherDescriptionParagraph = document.querySelector("#temperature");

locationParagraph.textContent = "Loading...";
weatherDescriptionParagraph.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = search.value;

  const url = `/weather?address=${address}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationParagraph.textContent = data.error;
      } else {
        locationParagraph.textContent = data.location.name;
        weatherDescriptionParagraph.textContent = `The weather forecast for ${data.location.name} in ${data.location.country}. It's ${data.currentWeather.weather_descriptions[0]}. The current temperature is ${data.currentWeather.temperature} and the pressure is ${data.currentWeather.pressure}hPa.`;
      }
    });
  });
});
