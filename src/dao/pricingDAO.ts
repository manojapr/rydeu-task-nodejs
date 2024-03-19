import { PrismaClient } from '@prisma/client';
import IPricing from '../models/IPricing';
const prisma = new PrismaClient();

export class PricingDAO {
    static async getAllPricingData(): Promise<IPricing[]> {
        try {
            const data = await prisma.pricing.findMany();
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async addPricingData(pricingData: IPricing): Promise<void> {
        try {
            await prisma.pricing.create({
                data: pricingData,
            });
        } catch (error) {
            throw error;
        }
    }

    static async getPricingData(city: string): Promise<IPricing[]> {
        try {
            const data = await prisma.pricing.findMany({
                where: {
                    city,
                },
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
}
