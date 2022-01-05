const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join("skrrt", "geng"));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Marcin Piwonski",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Marcin Piwonski",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "What do you need help with?",
    name: "Marcin Piwonski",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error:
        "The adress hasn't been provided! Please pass the address to get the weather forecast!",
    });
  }
  geocode(req.query.address, (error, { lon, lat } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    } else {
      forecast(lat, lon, (error, { currentWeather, location }) => {
        if (error) {
          return res.send({ error });
        } else {
          return res.send({
            location,
            temperature: currentWeather.temperature,
          });
        }
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  return res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Marcin Piwonski",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Marcin Piwonski",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
