import { Request, Response, NextFunction } from "express"
import { object, string, number, boolean } from 'zod';
import { PricingDAO } from "../dao/pricingDAO";
import { getDistanceAndTime } from "../utils/calculateDist";

const pricingSchema = object({
  country: string(),
  city: string().min(2),
  vehicleType: string(),
  amountAirportFees: number(),
  amountPerHour: number(),
  amountPerKm: number(),
  baseAmount: number(),
  baseKm: number(),
  cityFlag: boolean(),
});

const querySchema = object({
    pickup: string(),
    destination: string(),
});

export const getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await PricingDAO.getAllPricingData();

        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        return res.status(500).json({ err });
    }
}

export const postData = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const pricingData = req.body;

      await pricingSchema.parseAsync(pricingData);

      await PricingDAO.addPricingData(pricingData);

      res.status(201).json({
          success: true,
          data: "Pricing added."
      });
  } catch (err) {
      return res.status(400).json({ err });
  }
}

export const getPricingDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pickup, destination } = querySchema.parse(req.query);

        const [pickupCity, destinationCity] = await Promise.all([
            PricingDAO.getPricingData(pickup),
            PricingDAO.getPricingData(destination),
        ]);

        if (!pickupCity || !destinationCity) {
            return res.status(400).json({
                success: false,
                data: "City Not found"
            })
        }

        if(pickupCity[0].cityFlag == false || destinationCity[0].cityFlag == false) {
            return res.status(400).json({
                success: false,
                data: "Customer need to fill email to check price"
            })
        }

        const { distance } = await getDistanceAndTime(pickup, destination);
        // const distance = 25;
        if(distance > 1000){
            return res.status(400).json({
                success: false,
                data: "Too far to offer ride"
            })
        }

        const data = await PricingDAO.getPricingData(pickup)
        const price_object: any = {};

        for (const d of data) {
            if (d) {
                const price = d.baseAmount + d.amountAirportFees + distance * d.amountPerKm;
                price_object[d.vehicleType] = price;

                if(distance > 30 || price < 50){
                    return res.status(400).json({
                        success: false,
                        data: "Registration needed to check Price"
                    })
                }
            }
        }

        return res.status(200).json({
            success: true,
            msg: `Ride from ${pickup} to ${destination}`,
            data: price_object
        })
    } catch (err: any) {
        return res.status(500).json({ err })
    }
}