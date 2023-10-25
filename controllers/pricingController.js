const Pricing = require("../models/pricingModel");
const getDistanceAndTime = require("../utils/getDistanceAndTime");
const getPrice = require("../utils/getPrice");

//////////////////////for adding pricing details to database///////////////////////////////////

const addPricing = async (req, res) => {
  const requiredFields = [
    "country",
    "city",
    "flag",
    "vehicleType",
    "amountAirportFees",
    "amountPerHour",
    "amountPerKm",
    "baseAmount",
    "baseKm",
  ];

  const missingFields = requiredFields.filter((field) => {
    return (
      req.body[field] === undefined ||
      req.body[field] === null ||
      req.body[field] === ""
    );
  });

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing fields: ${missingFields.join(", ")}` });
  }

  const { country, city, vehicleType } = req.body;

  const pricingExists = await Pricing.findOne({ country, city, vehicleType });
  if (pricingExists) {
    return res.status(409).json({ error: "Pricing details already exist" });
  }

  try {
    const pricing = await Pricing.create(req.body);
    return res.status(201).json({ message: "Pricing details added" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////for checking price and for getting respnce email required or not///////////////////////////

const checkPricing = async (req, res) => {
  const { pickupCity, destination, vehicleType } = req.body;

  console.log(req.body);
  console.log(pickupCity);

  if (!pickupCity || !destination || !vehicleType) {
    return res
      .status(400)
      .json({ error: "Pickup, destination, and vehicleType are required" });
  }

  const pickupCityData = await Pricing.findOne({ city: pickupCity });
  if (!pickupCityData) {
    return res.status(404).json({ message: "City not found in the database" });
  }

  if (!pickupCityData.flag) {
    return res
      .status(200)
      .json({ message: "Please provide your email to proceed", result: true });
  }

  const getDistanceAndTimeData = await getDistanceAndTime(
    pickupCity,
    destination
  );

  const distance = getDistanceAndTimeData.distance;
  const time = getDistanceAndTimeData.time;

  if (distance > 1000) {
    return res
      .status(200)
      .json({ message: "The distance is too far to offer a ride" });
  }

  if (distance > 30) {
    return res.status(200).json({
      message: "Please provide your email, the distance is more than 30 KM",
      result: true,
    });
  }

  const pricingData = await Pricing.findOne({ city: pickupCity });
  if (!pricingData) {
    return res.status(404).json({ message: "Pricing details not found" });
  }

  const totalCost = await getPrice(distance, time, pickupCity, vehicleType);

  if (totalCost < 50) {
    return res.status(200).json({
      message:
        "Please provide your email, the total cost is less than 50 \u20AC",
      result: true,
    });
  }

  return res
    .status(200)
    .json({ message: "Pricing details sent", cost: `\u20AC ${totalCost}` });
};

module.exports = { addPricing, checkPricing };
