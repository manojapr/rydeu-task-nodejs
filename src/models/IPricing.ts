interface IPricing {
  id: number;
  country: string;
  city: string;
  vehicleType: string;
  amountAirportFees: number;
  amountPerHour: number;
  amountPerKm: number;
  baseAmount: number;
  baseKm: number;
  cityFlag: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default IPricing;