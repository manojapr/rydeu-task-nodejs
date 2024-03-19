import RydeuValidationError, { ApiCodes } from '../model/apiModel/ApiCode';
import { MongoServerSelectionError } from 'mongodb';

export const handleMongoError = (error: any) => {
  try {
    if (error.message && error.message.includes('E11000 duplicate key error')) {
      throw new RydeuValidationError(ApiCodes.DUPLICATE_KEY_ERROR);
    } else if (
      error.message &&
      error.message.includes('Cast to ObjectId failed')
    ) {
      throw new RydeuValidationError(ApiCodes.INVALID_CAST_ERROR);
    } else if ((error as any).name === 'ValidationError') {
      throw new RydeuValidationError(ApiCodes.MONGODB_VALIDATION_ERROR);
    } else if ((error as any).name === 'MongoNetworkError') {
      throw new RydeuValidationError(ApiCodes.MONGO_NETWORK_ERROR);
    } else if ((error as any).name === 'MongoServerError') {
      throw new RydeuValidationError(ApiCodes.MONGO_SERVER_ERROR);
    } else if (
      (error as any).name === 'MongooseError' &&
      error.message.includes('buffering timed out')
    ) {
      throw new RydeuValidationError(ApiCodes.MONGOOSE_TIMEOUT_ERROR);
    } else if (error instanceof MongoServerSelectionError) {
      throw new RydeuValidationError(ApiCodes.MONGO_SERVER_ERROR);
    }
  } catch (error) {
    console.error('Mongodb error occured', error);
    throw error;
  }
};
