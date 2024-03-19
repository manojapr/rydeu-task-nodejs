"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPricingInfo = exports.AddPricingInfo = exports.GetAllPricingData = void 0;
const details_1 = require("../model/details");
const validations_1 = require("../utils/validations");
const GeoCoding_1 = require("../utils/GeoCoding");
const GetAllPricingData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pricingInfo = yield details_1.Rydeu.find({});
        if (pricingInfo.length === 0) {
            return res
                .status(404)
                .json({ message: "No pricing information available" });
        }
        return res.status(200).json({ pricingInfo: pricingInfo });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.GetAllPricingData = GetAllPricingData;
const AddPricingInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pricingInfo = req.body;
    const { success } = validations_1.AddPricingInputCheck.safeParse(pricingInfo);
    if (!success) {
        return res
            .status(411)
            .json({ message: "Incorrect/Invalid Pricing Details" });
    }
    try {
        const createRydeuDetails = yield details_1.Rydeu.create(pricingInfo);
        return res.status(200).json({
            message: "Pricing Info updated Successfully",
            createRydeuDetails,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.AddPricingInfo = AddPricingInfo;
const GetPricingInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = validations_1.GetPricingInputCheck.safeParse(req.body);
    if (!success) {
        return res
            .status(411)
            .json({ message: "Incorrect/Invalid Pricing Details" });
    }
    const { pickup, destination } = req.body;
    try {
        const pickupDetails = yield details_1.Rydeu.find({ city: pickup });
        const destinationDetails = yield details_1.Rydeu.find({
            city: destination,
        });
        if (!pickupDetails || !destinationDetails) {
            return res
                .status(404)
                .json({ message: "Pickup or Destination City Information not found!" });
        }
        const distance = (yield (0, GeoCoding_1.calculateDistance)(pickup, destination));
        if (distance === null) {
            return res.status(400).json({ message: "Could not calculate distance" });
        }
        if (distance > 1000) {
            return res.json({ message: "Distance too far to offer ride" });
        }
        const price = (0, GeoCoding_1.calculateTotalPrice)(pickupDetails[0], distance);
        const emailRequired = pickupDetails[0].flag === false ||
            destinationDetails[0].flag === false ||
            distance > 30 ||
            price < 50;
        return res.json({
            emailRequired,
            message: emailRequired
                ? "You need to fill in your email to check pricing"
                : "Email is not required to check pricing",
            price: `€${price.toFixed(2)}`,
            distance: `${distance.toFixed(2)} km`,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.GetPricingInfo = GetPricingInfo;
