import { Schema, model, Document } from 'mongoose';

export interface CustomPricingInterface extends Document {
  countryName: string;
  cityName: string;
  vehicleTypes: string;
  airportFees: number;
  hourlyRate: number;
  perKmRate: number;
  baseAmount: number;
  baseKm: number;
  isCityFlagged: boolean;
}

const CustomPricingSchema = new Schema<CustomPricingInterface>(
  {
    countryName: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
      minLength: 2,
    },
    vehicleTypes: {
      type: String,
      required: true,
    },
    airportFees: {
      type: Number,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    perKmRate: {
      type: Number,
      required: true,
    },
    baseAmount: {
      type: Number,
      required: true,
    },
    baseKm: {
      type: Number,
      required: true,
    },
    isCityFlagged: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<CustomPricingInterface>(
  'CustomPricing',
  CustomPricingSchema
);
