const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Country Name is required"],
  },
  city: {
    type: String,
    required: [true, "City name is required "],
  },
  flag: { 
    type: Boolean, 
    required: [true, "flag value is required "],
  },
  vehicleType: {
    type: String,
    required: [true, "Vehicle Type is required "],
  },
  amountAirportFees: {
    type: Number,
    required: [true, "Airport fees amount is required"],
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: "Airport Fees Amount must be greater than or equal zero",
    },
  },
  amountPerHour: {
    type: Number,
    required: [true, "Amount per hour is required !"],
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: "Amount per hour must be greater than or equal zero",
    },
  },
  amountPerKm: {
    type: Number,
    required: [true, "Amount per KM is required !"],
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: "Amount per KM must be greater than or equal zero",
    },
  },
  baseAmount: {
    type: Number,
    required: [true, "Base Amount is required"],
  },
  baseKm: {
    type: Number,
    required: [true, "Base KM is required "],
  },
});

module.exports = mongoose.model("Pricing", PricingSchema);
