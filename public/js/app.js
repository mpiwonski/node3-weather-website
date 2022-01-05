const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationParagraph = document.querySelector("#location");
const temperatureParagraph = document.querySelector("#temperature");

locationParagraph.textContent = "Loading...";
temperatureParagraph.textContent = "";

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
        temperatureParagraph.textContent = data.temperature;
      }
    });
  });
});
