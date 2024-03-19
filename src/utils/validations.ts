import { z } from "zod";

export const AddPricingInputCheck = z.object({
  flag: z.boolean(),
  country: z.string(),
  city: z.string(),
  vehicleType: z.string(),
  amount_airport_fees: z.number(),
  amount_per_hours: z.number(),
  amount_per_km: z.number(),
  base_amount: z.number(),
  base_kms: z.number(),
});

export const GetPricingInputCheck = z.object({
  pickup: z.string().min(2),
  destination: z.string().min(2),
});
