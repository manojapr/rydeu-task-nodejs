const axios = require("axios");
const asyncHandler = require("express-async-handler");
require("dotenv").config({path : "../.env"});
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

//google maps API endpoint
const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json`;

//returns the distance between the two cities in KM.

const getDistance = asyncHandler(async (source, destination) => {
  const response = await axios.get(
    `${distanceMatrixUrl}?units=metric&origins=${source}&destinations=${destination}&key=${apiKey}`
  );
  const distance = response.data.rows[0].elements[0].distance.value/1000;
  return Number(distance);
});

module.exports = { getDistance };
