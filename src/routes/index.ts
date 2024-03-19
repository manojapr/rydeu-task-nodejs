import express from "express";
import {
  AddPricingInfo,
  GetAllPricingData,
  GetPricingInfo,
} from "../controllers/rydueController";
const router = express.Router();

//post the pricing information
router.post("/add_pricing", AddPricingInfo);

//get the ride info
router.post("/get_pricing", GetPricingInfo);

//get all the pricings
router.get("/", GetAllPricingData);

export { router as RydeuRouter };
