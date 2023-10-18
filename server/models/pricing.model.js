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
  vehicleType: {
    type: String,
    enum: ["Economy", "Comfort", "Minivan"],
    required: [true, "Vehicle Type is required "],
  },
  amountAirportFees: {
    type: Number,
    required: [true, "Airport fees amount is required"],
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "Airport Fees Amount must be greater than zero",
    },
  },
  amountPerHour: {
    type: Number,
    required: [true, "Amount per hour is reuired !"],
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "Amount per hour must be greater than zero",
    },
  },
  amountPerKm: {
    type: Number,
    required: [true, "Amount per KM is reuired !"],
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "Amount per KM must be greater than zero",
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

module.exports = new mongoose.model("Pricing", PricingSchema);
