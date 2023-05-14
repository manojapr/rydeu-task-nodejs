const express = require('express');
const { getCity, getDistanceTime, getPrice } = require('../utils');

const router = express.Router();

router.post('/', async (req, res) => {
  // TODO: distance, price, request body validation

  const { origin, destination, vehicleType } = req.body;
  const city = await getCity(origin);
  if (city !== 'London' && city !== 'Paris') {
    return res.json({ email: true, message: 'Registration required' });
  }
  const data = await getDistanceTime(origin, destination);
  if (data.status !== 'OK') throw new Error('no results');
  // distance in kilometres
  const distance = data.distance.value / 1000;
  if (distance > 1000) {
    return res.json({ message: 'Too far to offer ride' });
  }
  if (distance > 30) {
    return res.json({ email: true, message: 'Registration required' });
  }

  // time in hours
  const time = data.duration.value / 3600;
  const price = await getPrice(distance, time, city, vehicleType);
  if (price < 50) {
    return res.json({ email: true, message: 'Registration required' });
  }

  res.json({
    email: false,
    message: 'Registration not required',
    distance,
    price,
  });
});

module.exports = { priceRouter: router }
