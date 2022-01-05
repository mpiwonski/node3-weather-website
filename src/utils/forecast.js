const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=46603dd1e319abed5bf23876d5562b2d&query=${lat},${lon}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather forecast service!", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(undefined, {
        currentWeather: body.current,
        location: body.location,
      });
    }
  });
};

module.exports = forecast;
