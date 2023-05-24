const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  flag: { type: Boolean, default: false },
  pricing: [
    {
      vehicleType: { type: String, required: true },
      amountAirportFees: { type: Number, required: true },
      amountPerHour: { type: Number, required: true },
      amountPerKm: { type: Number, required: true },
      baseAmount: { type: Number, required: true },
      baseKm: { type: Number, required: true },
    },
  ],
});

const City = mongoose.model('City', citySchema);

module.exports = City;
