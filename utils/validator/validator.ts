import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import RydeuValidationError, { ApiCodes } from '../../model/apiModel/ApiCode';
export const customPricingSchemaValidator = [
  body('countryName')
    .notEmpty()
    .withMessage('countryName is a required field')
    .isString()
    .withMessage('countryName must be a string'),
  body('cityName')
    .notEmpty()
    .withMessage('cityName is a required field')
    .isString()
    .withMessage('cityName must be a string')
    .isLength({ min: 2 })
    .withMessage('cityName should be at least 2 characters long.'),
  body('vehicleTypes')
    .notEmpty()
    .withMessage('vehicleTypes is a required field')
    .isString()
    .withMessage('vehicleTypes must be a string'),
  body('airportFees')
    .notEmpty()
    .withMessage('airportFees is required')
    .isNumeric()
    .withMessage('airportFees must be a number')
    .isFloat({ min: 0 })
    .withMessage('airportFees should be at least 0'),
  body('hourlyRate')
    .notEmpty()
    .withMessage('hourlyRate is required')
    .isNumeric()
    .withMessage('hourlyRate must be a number')
    .isFloat({ min: 0 })
    .withMessage('hourlyRate should be at least 0'),
  body('perKmRate')
    .notEmpty()
    .withMessage('perKmRate is required')
    .isNumeric()
    .withMessage('perKmRate must be a number')
    .isFloat({ min: 0 })
    .withMessage('perKmRate should be at least 0'),
  body('baseAmount')
    .notEmpty()
    .withMessage('baseAmount is required')
    .isNumeric()
    .withMessage('baseAmount must be a number')
    .isFloat({ min: 0 })
    .withMessage('baseAmount should be at least 0'),
  body('baseKm')
    .notEmpty()
    .withMessage('baseKm is required')
    .isNumeric()
    .withMessage('baseKm must be a number')
    .isFloat({ min: 0 })
    .withMessage('baseKm should be at least 0'),
  body('isCityFlagged')
    .notEmpty()
    .withMessage('isCityFlagged is required')
    .isBoolean()
    .withMessage('isCityFlagged must be a boolean'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.array();
      throw new RydeuValidationError({
        ...ApiCodes.REQUEST_VALIDATION_FAILED,
        message: validationErrors,
      });
    }
    next();
  },
];

export const pricingForTwoCities = [
  body('pickup')
    .notEmpty()
    .withMessage('pickup is a required field')
    .isString()
    .withMessage('pickup must be a string'),
  body('destination')
    .notEmpty()
    .withMessage('destination is a required field')
    .isString()
    .withMessage('destination must be a string'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.array();
      throw new RydeuValidationError({
        ...ApiCodes.REQUEST_VALIDATION_FAILED,
        message: validationErrors,
      });
    }
    next();
  },
];
