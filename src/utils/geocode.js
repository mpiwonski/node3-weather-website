const request = require("request");

const geocode = (address, callback) => {
  if (!address) {
    console.log("The address hasn't been provided! Please provide one.");
  } else {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGl3a281MTIiLCJhIjoiY2t4ajNlamlhNHlhYTJ1bzFwMWg5ZHFuayJ9.5EAVlCj1NFCNu7zwInOAaw`;
    request({ url, json: true }, (error, { body: { features } = {} } = {}) => {
      if (error) {
        callback("Unable to connect to location services", undefined);
      } else if (features.length === 0) {
        callback("Given place hasn't been found", undefined);
      } else {
        const lon = features[0].center[0];
        const lat = features[0].center[1];
        const data = {
          lon,
          lat,
          location: features[0].place_name,
        };
        console.log(data.location);
        callback(undefined, data);
      }
    });
  }
};

module.exports = geocode;
