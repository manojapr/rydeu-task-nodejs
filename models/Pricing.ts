import { Schema, model, Document } from 'mongoose';

export interface IPricing extends Document {
    country: string
    city: string
    vehicle_types: string
    amount_airport_fees: number
    amount_per_hour: number
    amount_per_km: number
    base_amount: number
    base_km: number
    city_flag: boolean
}

const PricingSchema = new Schema<IPricing>({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        minLength: 2
    },
    vehicle_types: {
        type: String,
        required: true, 
    },
    amount_airport_fees: {
        type: Number,
        required: true
    },
    amount_per_hour: {
        type: Number,
        required: true
    },
    amount_per_km: {
        type: Number,
        required: true
    },
    base_amount: {
        type: Number,
        required: true
    },
    base_km: {
        type: Number,
        required: true
    },
    city_flag: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})


export default model<IPricing>('Pricing', PricingSchema);