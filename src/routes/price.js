const express = require('express');
const { getCity, getDistance, getPrice } = require('../utils');

const router = express.Router();

router.post('/', async (req, res) => {
  // TODO: distance, price, request body validation

  const { origin, destination } = req.body;
  const city = await getCity(origin);
  // console.log(city);
  if (city === 'London' || city === 'Paris') {
    return res.json({ email: true, message: 'Registration required' });
  }

  const distance = await getDistance(origin, destination);
  // console.log(distance);
  if (distance > 1000) {
    return res.json({ message: 'Too far to offer ride' });
  }
  if (distance > 30) {
    return res.json({ email: true, message: 'Registration required' });
  }

  const price = getPrice(distance);
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
