const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { ApiError } = require("../utils/ApiError");
const { StatusCodes } = require("http-status-codes");
const Pricing = require("../models/pricing.model");
const { getDistance } = require("../utils/calculateDistance");
const { FLAGGED_CITIES } = require("../utils/data");

const requiredFields = [
  "country",
  "city",
  "vehicleType",
  "amountAirportFees",
  "amountPerHour",
  "amountPerKm",
  "baseAmount",
  "baseKm",
];

const addPricing = asyncHandler(async (req, res) => {
  const missingFields = [];
  requiredFields.forEach((field) => {
    if (
      req.body[field] === undefined ||
      req.body[field] === null ||
      req.body[field] === ""
    ) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    const errorMessage = `Missing fields: ${missingFields.join(", ")}`;
    throw new ApiError(StatusCodes.BAD_REQUEST, errorMessage);
  }

  const { country, city, vehicleType } = req.body;
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

  if (!FLAGGED_CITIES.includes(pickup)) {
    return res.status(StatusCodes.OK).json({
      message: "User has to enter email",
      result: true,
      code: StatusCodes.OK,
    });
  }
  const distance = await getDistance(pickup, destination);
  const pricingData = await Pricing.findOne({ city: pickup.toLowerCase() });
  if (!pricingData) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Pricing details not found",
      code: StatusCodes.NOT_FOUND,
    });
  }
  if (distance > 1000) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "Too far to offer ride", code: StatusCodes.OK });
  }

  if (distance > 40) {
    return res.status(StatusCodes.OK).json({
      message: "User has to enter email",
      result: true,
      code: StatusCodes.OK,
    });
  }

  const totalCost = pricingData.baseAmount + distance * pricingData.amountPerKm;
  if (totalCost < 50) {
    return res
      .status(StatusCodes.OK)
      .json({
        message: "User has to enter email",
        result: true,
        code: StatusCodes.OK,
      });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "Pricing details sent", cost: `\u20AC ${totalCost}`,code : StatusCodes.OK });
});

module.exports = { addPricing, checkPricing };
