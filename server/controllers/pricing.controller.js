const asyncHandler = require("express-async-handler");
const { ApiError } = require("../utils/ApiError");
const { StatusCodes } = require("http-status-codes");
const Pricing = require("../models/pricing.model");
const { getDistance } = require("../utils/calculateDistance");
const { FLAGGED_CITIES } = require("../utils/data");


//required fields to add pricing details to database.
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

//Add pricing details to the database.
const addPricing = asyncHandler(async (req, res) => {

  //check for missing fields and store the names in an array.
  const missingFields = [];
  requiredFields.forEach((field) => {
    if ( req.body[field] === undefined || req.body[field] === null || req.body[field] === "" ) {
      missingFields.push(field);
    }
  });

  //if required fields are not present an error is thrown with missing field names.
  if (missingFields.length > 0) {
    const errorMessage = `Missing fields: ${missingFields.join(", ")}`;
    throw new ApiError(StatusCodes.BAD_REQUEST, errorMessage);
  }

  const { country, city, vehicleType } = req.body;

  const pricingExists = await Pricing.findOne({ country, city, vehicleType });
  if (pricingExists) {
    throw new ApiError(StatusCodes.CONFLICT, "Pricing details exists");
  }

  //adding pricing details to the database.
  const pricing = await Pricing.create(req.body);
  return res.status(StatusCodes.CREATED).json({ message: "Pricing details added" });
});




//calculate the pricing based on pickup and destination using google maps API
const checkPricing = asyncHandler(async (req, res) => {

  const { pickup, destination } = req.body;
  if (!pickup || !destination) {
    throw new ApiError( StatusCodes.BAD_REQUEST, "Pickup and destination details are required" );
  }

  //checking if the pickup city is in the list of flagged cities, if it is not in the list user has to enter email.
  if (!FLAGGED_CITIES.includes(pickup)) {
    return res.status(StatusCodes.OK).json({ message: "User has to enter email", result: true, code: StatusCodes.OK });
  }

  //calculating the distance by using google geocode distance matrix api
  const distance = await getDistance(pickup, destination);

  if (distance > 1000) {
    return res.status(StatusCodes.OK).json({ message: "Too far to offer ride", code: StatusCodes.OK });
  }

  if (distance > 30) {
    return res.status(StatusCodes.OK).json({ message: "User has to enter email, distance is more than 30 KM", result: true, code: StatusCodes.OK });
  }

  //getting the pricing details fromt the database
  const pricingData = await Pricing.findOne({ city: pickup.toLowerCase() });
  if (!pricingData) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Pricing details not found", code: StatusCodes.NOT_FOUND });
  }
  
  //calculating the total cost 
  const totalCost = pricingData.baseAmount + distance * pricingData.amountPerKm;
  if (totalCost < 50) {
    return res.status(StatusCodes.OK).json({ message: "User has to enter email, total cost is less than 50 \u20AC", result: true, code: StatusCodes.OK });
  }

  //returning the total cost details.
  return res.status(StatusCodes.OK).json({ message: "Pricing details sent", cost: `\u20AC ${totalCost}`,code : StatusCodes.OK });
});

module.exports = { addPricing, checkPricing };
