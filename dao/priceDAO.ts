import RydeuValidationError, { ApiCodes } from '../model/apiModel/ApiCode';
import CustomPricing, { CustomPricingInterface } from '../model/price';
import { handleMongoError } from '../utils/handleError';

export async function getAllCustomPricingDataDAO(): Promise<
  CustomPricingInterface[]
> {
  try {
    const data = await CustomPricing.find({});
    return data;
  } catch (error) {
    console.error(
      'got the error when getting all cusotmer pricing data',
      error
    );
    if (error instanceof RydeuValidationError) {
      throw error;
    }
    handleMongoError(error);
    throw new RydeuValidationError(ApiCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function addCustomPricingDataDAO(
  pricingData: CustomPricingInterface
) {
  try {
    const newPricing = new CustomPricing(pricingData);
    const response = await newPricing.save();
    return response;
  } catch (error) {
    console.error('got the error ini dao when adding custom price data', error);
    if (error instanceof RydeuValidationError) {
      throw error;
    }
    handleMongoError(error);
    throw new RydeuValidationError(ApiCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function getCustomPricingDataDAO(
  city: string
): Promise<CustomPricingInterface[]> {
  try {
    const data: CustomPricingInterface[] = await CustomPricing.find({
      cityName: city,
    }).exec();
    if (data.length === 0) {
      throw new RydeuValidationError(ApiCodes.CITY_NOT_FOUND);
    }
    return data;
  } catch (error) {
    console.error('Error in DAO while getting custom pricing:', error);
    if (error instanceof RydeuValidationError) {
      throw error;
    }
    handleMongoError(error);
    throw new RydeuValidationError(ApiCodes.INTERNAL_SERVER_ERROR);
  }
}
