"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPricingInputCheck = exports.AddPricingInputCheck = void 0;
const zod_1 = require("zod");
exports.AddPricingInputCheck = zod_1.z.object({
    flag: zod_1.z.boolean(),
    country: zod_1.z.string(),
    city: zod_1.z.string(),
    vehicleType: zod_1.z.string(),
    amount_airport_fees: zod_1.z.number(),
    amount_per_hours: zod_1.z.number(),
    amount_per_km: zod_1.z.number(),
    base_amount: zod_1.z.number(),
    base_kms: zod_1.z.number(),
});
exports.GetPricingInputCheck = zod_1.z.object({
    pickup: zod_1.z.string().min(2),
    destination: zod_1.z.string().min(2),
});
