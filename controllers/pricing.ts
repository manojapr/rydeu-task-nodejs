import express, { Request, Response, NextFunction } from "express"
import { PricingDAO } from "../dao/pricingDAO";
import Pricing, { IPricing } from "../models/Pricing"
import { calculateDistance } from "../utils/calculateDist";
import { pricingSchemaValidator } from "../utils/validator/validator";

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

        await pricingSchemaValidator.validateAsync(pricingData)

        await PricingDAO.addPricingData(pricingData);

        res.status(201).json({
            success: true,
            data: "Pricing added."
        });
    } catch (err) {
        return res.status(500).json({ err });
    }
}

export const getPricingDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pickup, destination } = req.body

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

        if(pickupCity[0].city_flag == false || destinationCity[0].city_flag == false) {
            return res.status(400).json({
                success: false,
                data: "Customer need to fill email to check price"
            })
        }

        const apiKey = process.env.APIKEY || ''
        const distance = await calculateDistance(pickup, destination, apiKey)
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
                const price = d.base_amount + d.amount_airport_fees + distance * d.amount_per_km;
                price_object[d.vehicle_types] = price;

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