const axios = require('axios');

const apiKey = process.env.API_KEY;
const url = process.env.URL;
module.exports.getAirQuality = async (lat,long) =>  axios.get(`${url}/nearest_city?lat=${lat}&lon=${long}&key=${apiKey}`) 