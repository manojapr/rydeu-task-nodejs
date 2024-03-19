import { Request, Response, NextFunction } from "express";
import { Rydeu } from "../model/details";
import { Details } from "../dto/pricing.dto";
import {
  AddPricingInputCheck,
  GetPricingInputCheck,
} from "../utils/validations";
import { calculateTotalPrice, calculateDistance } from "../utils/GeoCoding";

export const GetAllPricingData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pricingInfo = <Details[]>await Rydeu.find({});
    if (pricingInfo.length === 0) {
      return res
        .status(404)
        .json({ message: "No pricing information available" });
    }

    return res.status(200).json({ pricingInfo: pricingInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const AddPricingInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pricingInfo = req.body;
  const { success } = AddPricingInputCheck.safeParse(pricingInfo);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Incorrect/Invalid Pricing Details" });
  }

  try {
    const createRydeuDetails = await Rydeu.create(pricingInfo);
    return res.status(200).json({
      message: "Pricing Info updated Successfully",
      createRydeuDetails,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetPricingInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { success } = GetPricingInputCheck.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Incorrect/Invalid Pricing Details" });
  }
  const { pickup, destination } = req.body;

  try {
    const pickupDetails: Details[] = await Rydeu.find({ city: pickup });
    const destinationDetails: Details[] = await Rydeu.find({
      city: destination,
    });

    if (!pickupDetails || !destinationDetails) {
      return res
        .status(404)
        .json({ message: "Pickup or Destination City Information not found!" });
    }

    const distance = (await calculateDistance(pickup, destination)) as number;

    if (distance === null) {
      return res.status(400).json({ message: "Could not calculate distance" });
    }

    if (distance > 1000) {
      return res.json({ message: "Distance too far to offer ride" });
    }

    const price = calculateTotalPrice(pickupDetails[0], distance);

    const emailRequired =
      pickupDetails[0].flag === false ||
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
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
