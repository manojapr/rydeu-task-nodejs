import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import RydeuValidationError, { ApiCodes } from '../model/apiModel/ApiCode';
import {
  getAllCustomPricingDataDAO,
  addCustomPricingDataDAO,
  getCustomPricingDataDAO,
} from '../dao/priceDAO';
import { distanceCalculator } from '../utils/distanceCalculator';
import { createResponse } from '../utils/apiUtils';

export const getData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAllCustomPricingDataDAO();
    res
      .status(ApiCodes.SUCCESS.statusCode)
      .send(createResponse(data, ApiCodes.SUCCESS));
  } catch (err) {
    console.error('Got error getting data', err);
    next(err);
  }
};

export const postData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pricingData = req.body;
    const response = await addCustomPricingDataDAO(pricingData);
    res
      .status(ApiCodes.SUCCESS.statusCode)
      .send(createResponse(response, ApiCodes.SUCCESS));
  } catch (err) {
    console.error('Got error when posting data', err);
    next(err);
  }
};

export const getPriceDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pickup, destination } = req.body;
    const [pickupCity, destinationCity] = await Promise.all([
      getCustomPricingDataDAO(pickup),
      getCustomPricingDataDAO(destination),
    ]);

    if (
      pickupCity[0].isCityFlagged == false ||
      destinationCity[0].isCityFlagged == false
    ) {
      throw new RydeuValidationError({
        ...ApiCodes.EMAIL_REQUIRED,
        message: 'Customer need to fill email to check price for these cities',
      });
    }

    const apiKey = process.env.APIKEY || '';
    const distance = await distanceCalculator(pickup, destination, apiKey);
    if (!distance) {
      throw new RydeuValidationError(ApiCodes.CITY_NOT_FOUND);
    }
    console.log('logging Distance', distance);
    if (distance > 1000) {
      throw new RydeuValidationError({
        ...ApiCodes.DISTANCE_TOO_FAR,
        message: `${distance} km is too long to offer ride.`,
      });
    }
    if (!distance) {
      throw new RydeuValidationError(ApiCodes.EXTERNAL_API_ERROR);
    }
    const price_object: any = {};
    const cities = await getCustomPricingDataDAO(pickup);
    for (const city of cities) {
      if (city) {
        const price =
          city.baseAmount + city.airportFees + distance * city.perKmRate;
        price_object[city.vehicleTypes] = price;
        if (distance > 30 || price < 50) {
          throw new RydeuValidationError(ApiCodes.EMAIL_REQUIRED);
        }
      }
    }

    return res.status(ApiCodes.SUCCESS.statusCode).send(
      createResponse(
        { price_object },
        {
          ...ApiCodes.SUCCESS,
          message: `Ride from ${pickup} to ${destination}`,
        }
      )
    );
  } catch (err: any) {
    console.error('got the error when calculating amount for distacnce', err);
    next(err);
  }
};
