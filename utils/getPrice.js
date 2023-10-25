const Pricing = require("../models/pricingModel");

const getPrice = async (dist, time, city, vehicleType) => {
    try {
      const pricing = await Pricing.findOne({ city: city, vehicleType: vehicleType });
  
      if (!pricing) return 100;
  
      const {baseAmount, amountAirportFees, amountPerHour, baseKm, amountPerKm} = pricing;

      let price = baseAmount + amountAirportFees + Math.floor(time) * amountPerHour + baseKm * amountPerKm;
  
      if (dist > baseKm) price += (dist - baseKm) * amountPerKm;
  
      return price;
    } catch (error) {
      throw new Error('Failed to get price from the database');
    }
  };

  module.exports = getPrice;
  