const https = require("https");
const API_URL = "https://api.restcountries.com/countries/v5";

require("dotenv").config()
const API_KEY = process.env.API_KEY;

let countriesData;

function fetchCountries() {
  return new Promise(function (resolve, reject) {
    if (!API_KEY) {
      return reject(new Error("API_KEY não encontrada no .env"));
    }
    
    const options = {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    let req = https.get(API_URL, options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        countriesData = JSON.parse(data);
        resolve(countriesData);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}

module.exports = {
  fetchCountries: fetchCountries,
};
