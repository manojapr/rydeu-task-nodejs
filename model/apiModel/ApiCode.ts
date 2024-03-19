import { ValidationError } from 'express-validator';

export interface ApiCode {
  apiCode: string;
  isError: boolean;
  message: string | ValidationError[];
  statusCode: number;
}

interface ApiCodes {
  INVALID_JSON_FORMAT: ApiCode;
  SUCCESS: ApiCode;
  DUPLICATE_KEY_ERROR: ApiCode;
  INVALID_CAST_ERROR: ApiCode;
  MONGODB_VALIDATION_ERROR: ApiCode;
  MONGO_NETWORK_ERROR: ApiCode;
  MONGO_SERVER_ERROR: ApiCode;
  MONGOOSE_TIMEOUT_ERROR: ApiCode;
  INTERNAL_SERVER_ERROR: ApiCode;
  REQUEST_VALIDATION_FAILED: ApiCode;
  EXTERNAL_API_ERROR: ApiCode;
  CITY_NOT_FOUND: ApiCode;
  EMAIL_REQUIRED: ApiCode;
  DISTANCE_TOO_FAR: ApiCode;
}

export default class RydeuValidationError extends Error {
  constructor(
    public readonly apiCode: ApiCode,
    message?: string | ValidationError[]
  ) {
    super(
      typeof message === 'string'
        ? message
        : JSON.stringify(message || apiCode.message)
    );
    this.name = 'RydeuValidationError';
  }
}

export const ApiCodes: ApiCodes = {
  INVALID_JSON_FORMAT: {
    isError: true,
    message: 'Invalid Request passed',
    apiCode: 'INVALID_JSON_FORMAT',
    statusCode: 400,
  },
  SUCCESS: {
    isError: false,
    message: 'SUCCESS',
    apiCode: 'SUCCESS',
    statusCode: 200,
  },
  DUPLICATE_KEY_ERROR: {
    isError: true,
    message: 'Duplicate key error',
    apiCode: 'DUPLICATE_KEY_ERROR',
    statusCode: 400,
  },
  INVALID_CAST_ERROR: {
    isError: true,
    message: 'Invalid cast error',
    apiCode: 'INVALID_CAST_ERROR',
    statusCode: 400,
  },
  MONGODB_VALIDATION_ERROR: {
    isError: true,
    message: 'MongoDB validation error',
    apiCode: 'MONGODB_VALIDATION_ERROR',
    statusCode: 400,
  },
  MONGO_NETWORK_ERROR: {
    isError: true,
    message: 'MongoDB network error',
    apiCode: 'MONGO_NETWORK_ERROR',
    statusCode: 500,
  },
  MONGO_SERVER_ERROR: {
    isError: true,
    message: 'MongoDB server error',
    apiCode: 'MONGO_SERVER_ERROR',
    statusCode: 500,
  },
  MONGOOSE_TIMEOUT_ERROR: {
    isError: true,
    message: 'Mongoose timeout error',
    apiCode: 'MONGOOSE_TIMEOUT_ERROR',
    statusCode: 500,
  },
  INTERNAL_SERVER_ERROR: {
    isError: true,
    message: 'Internal server error',
    apiCode: 'INTERNAL_SERVER_ERROR',
    statusCode: 500,
  },
  REQUEST_VALIDATION_FAILED: {
    isError: true,
    message: 'Request validation failed',
    apiCode: 'REQUEST_VALIDATION_FAILED',
    statusCode: 400,
  },
  EXTERNAL_API_ERROR: {
    isError: true,
    message: 'Error communicating with external API',
    apiCode: 'EXTERNAL_API_ERROR',
    statusCode: 500,
  },
  CITY_NOT_FOUND: {
    isError: true,
    message: 'City not available or not found.',
    apiCode: 'CITY_NOT_FOUND',
    statusCode: 500,
  },
  EMAIL_REQUIRED: {
    isError: true,
    message: 'Customer need to fill email to check price.',
    apiCode: 'EMAIL_REQUIRED',
    statusCode: 500,
  },
  DISTANCE_TOO_FAR: {
    isError: true,
    message: 'Too far to offer ride.',
    apiCode: 'DISTANCE_TOO_FAR',
    statusCode: 500,
  },
};
