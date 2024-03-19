import mongoose, { Document, Schema, Model } from "mongoose";
import { Details } from "../dto/pricing.dto";

const detailsSchema = new Schema<Details>({
  flag: { type: "boolean", default: false, required: true },
  country: { type: "string", required: true },
  city: { type: "string", required: true },
  vehicleType: { type: "string", required: true },
  amount_airport_fees: { type: "number", required: true },
  amount_per_hours: { type: "number", required: true },
  amount_per_km: { type: "number", required: true },
  base_amount: { type: "number", required: true },
  base_kms: { type: "number", required: true },
});

export const Rydeu: Model<Details> =
  mongoose.models.Rydeu || mongoose.model("Rydeu", detailsSchema);
