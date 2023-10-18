const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { ApiError } = require("../utils/ApiError");
const { StatusCodes } = require("http-status-codes");
const Pricing = require("../models/pricing.model");
const { getDistance } = require("../utils/calculateDistance");
const { FLAGGED_CITIES } = require("../utils/data");

// adds a new p
const addPricing = asyncHandler(async (req, res) => {
  //checking if all the required values are received
  const {
    country,
    city,
    vehicleType,
    amountAirportFees,
    amountPerHour,
    amountPerKm,
    baseAmount,
    baseKm,
  } = req.body;
  if (
    !country ||
    !city ||
    !vehicleType ||
    !amountAirportFees ||
    !amountPerHour ||
    !amountPerKm ||
    !baseAmount ||
    !baseKm
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Fill the required details");
  }

  const pricingExists = await Pricing.findOne({ country, city, vehicleType });
  if (pricingExists) {
    throw new ApiError(StatusCodes.CONFLICT, "Pricing details exists");
  }

  const pricing = await Pricing.create(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Pricing details added" });
});

const checkPricing = asyncHandler(async (req, res) => {
  const { pickup, destination } = req.body;
  if (!pickup || !destination) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Pickup and destination details are required"
    );
  }

  if (FLAGGED_CITIES.includes(pickup)) {
    return res
      .status(200)
      .json({ message: "User has to enter email", result: true });
  }

  const distance = await getDistance(pickup, destination);
  const pricingData = await Pricing.findOne({ city: pickup });

  if (distance > 1000) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "Too far to offer ride" });
  }

  if (distance > 30) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "User has to enter email", result: true });
  }

  const totalCost = pricingData.baseAmount + distance * pricingData.amountPerKm;

  if (totalCost < 50) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "User has to enter email", result: true });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "Pricing details sent", cost: totalCost });
});
module.exports = { addPricing, checkPricing };
