import Joi from 'joi';

export const pricingSchemaValidator = Joi.object({
    country: Joi.string().required().min(2).messages({
        'any.required': 'country is a required field',
        'string.empty': 'country must not be empty',
        'string.base': 'country must be a string',
        'string.min': 'country should be at least {{#limit}} characters long.'
    }),
    city: Joi.string().required().min(2).messages({
        'any.required': 'city is a required field',
        'string.empty': 'city must not be empty',
        'string.base': 'city must be a string',
        'string.min': 'city should be at least {{#limit}} characters long.'
    }),
    vehicle_types: Joi.string().required().messages({
        'any.required': 'vehicle_types is a required field',
        'string.empty': 'vehicle_types must not be empty',
        'string.base': 'vehicle_types must be a string',
    }),
    amount_airport_fees: Joi.number().positive().min(0).required().messages({
        'any.required': 'amount_airport_fees is required',
        'number.base': 'amount_airport_fees must be a number',
        'number.min': 'amount_airport_fees should be at least {{#limit}}',
        'number.positive': 'amount_airport_fees must be positive',
        'number.empty': 'amount_airport_fees must not be empty'
    }),
    amount_per_hour: Joi.number().positive().min(0).required().messages({
        'any.required': 'amount_per_hour is required',
        'number.base': 'amount_per_hour must be a number',
        'number.min': 'amount_per_hour should be at least {{#limit}}',
        'number.positive': 'amount_per_hour must be positive',
        'number.empty': 'amount_per_hour must not be empty'
    }),
    amount_per_km: Joi.number().positive().min(0).required().messages({
        'any.required': 'amount_per_km is required',
        'number.base': 'amount_per_km must be a number',
        'number.min': 'amount_per_km should be at least {{#limit}}',
        'number.positive': 'amount_per_km must be positive',
        'number.empty': 'amount_per_km must not be empty'
    }),
    base_amount: Joi.number().positive().min(0).required().messages({
        'any.required': 'base_amount is required',
        'number.base': 'base_amount must be a number',
        'number.min': 'base_amount should be at least {{#limit}}',
        'number.positive': 'base_amount must be positive',
        'number.empty': 'base_amount must not be empty'
    }),
    base_km: Joi.number().positive().min(0).required().messages({
        'any.required': 'base_km is required',
        'number.base': 'base_km must be a number',
        'number.min': 'base_km should be at least {{#limit}}',
        'number.positive': 'base_km must be positive',
        'number.empty': 'base_km must not be empty'
    }),
    city_flag: Joi.boolean().valid(true, false).required().messages({
        'any.required': 'city_flag is required.',
        'any.only': 'city_flag must be one of true or false.',
    })
})