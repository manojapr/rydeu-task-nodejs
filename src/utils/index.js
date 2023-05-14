const { Client } = require('@googlemaps/google-maps-services-js');
const db = require('../db');

const getDistanceTime = async (loc, dest) => {
  const gMapsClient = new Client();
  const key = process.env.API_KEY;
  let res = await gMapsClient.geocode({
    params: {
      key,
      address: loc,
    },
  });
  const origin = res.data.results[0].geometry.location;

  res = await gMapsClient.geocode({
    params: {
      key,
      address: dest,
    },
  });
  const destination = res.data.results[0].geometry.location;

  res = await gMapsClient.distancematrix({
    params: {
      key,
      origins: [origin],
      destinations: [destination],
      mode: 'driving',
    },
  });
  // console.log(JSON.stringify(res.data.rows));
  return res.data.rows[0].elements[0];
};

const getCity = async address => {
  const gMapsClient = new Client();
  const res = await gMapsClient.geocode({
    params: {
      key: process.env.API_KEY,
      address,
    },
  });

  const cityDetails = res.data.results[0].address_components.find(ob =>
    ob.types.includes('locality')
  );

  return cityDetails.long_name;
};

const getPrice = async (dist, time, city, vehicleType) => {
  const res = await db.query(
    'SELECT * from pricing WHERE city = $1 AND vehicle_type = $2',
    [city, vehicleType]
  );

  if (!res) return 100;

  const {
    base_charge: baseCharge,
    airport_fees: airportFees,
    hourly_rate: hourlyRate,
    min_dist: minDist,
    per_km_rate: amtPerKm,
  } = res.rows[0];

  let price =
    baseCharge +
    airportFees +
    Math.floor(time) * hourlyRate +
    minDist * amtPerKm;

  if (dist > minDist) price += (dist - minDist) * amtPerKm;
  
  return price;
};

module.exports = { getPrice, getDistanceTime, getCity };
