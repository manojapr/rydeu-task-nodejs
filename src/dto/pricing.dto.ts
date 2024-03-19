import { Document } from "mongoose";

export interface Details extends Document {
  flag: boolean;
  country: string;
  city: string;
  vehicleType: string;
  amount_airport_fees: number;
  amount_per_hours: number;
  amount_per_km: number;
  base_amount: number;
  base_kms: number;
}
