import Pricing, { IPricing } from "../models/Pricing";

export class PricingDAO {
    static async getAllPricingData(): Promise<IPricing[]> {
        try {
            const data = await Pricing.find({});
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async addPricingData(pricingData: IPricing): Promise<void> {
        try {
            const newPricing = new Pricing(pricingData);
            await newPricing.save();
        } catch (error) {
            throw error;
        }
    }

    static async getPricingData(city: string): Promise<IPricing[]> {
        try {
            return await Pricing.find({ city }).exec();
        } catch (error) {
            throw error;
        }
    }
}
