const City = require('../models/city.model');

exports.checkPrice = async (req, res) => {
  try {
    const { distance, city, price, vehicleType } = req.body;

    // Check if the payload is valid
    if (!distance || !city || !price || !vehicleType) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // Retrieve the city and pricing information
    const cityData = await City.findOne({ name: city });

    // Check if the city exists in the database
    if (!cityData) {
      return res.status(400).json({ error: 'City not found' });
    }

    // Find the pricing data for the specified vehicle type
    const pricingData = cityData.pricing.find(
      (pricing) => pricing.vehicleType === vehicleType
    );

    // Check if the pricing data for the vehicle type exists
    if (!pricingData) {
      return res.status(400).json({ error: 'Vehicle type not found' });
    }

    // Check the conditions for email requirement
    if (
      distance > 30 ||
      cityData.flag ||
      price < pricingData.baseAmount
    ) {
      return res.json({ emailRequired: true });
    }

    // Check if the distance is too far
    if (distance > 1000) {
      return res.json({ error: 'Too far to offer ride' });
    }

    // Email not required
    return res.json({ emailRequired: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
