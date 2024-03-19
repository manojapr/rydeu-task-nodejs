import { Details } from "../dto/pricing.dto";

export async function calculateDistance(
  pickupAddress: string,
  destinationAddress: string
) {
  const apiKey = process.env.GEOCODING_API;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    pickupAddress
  )}&destinations=${encodeURIComponent(destinationAddress)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.rows[0].elements[0].status === "OK") {
      const distance = data.rows[0].elements[0].distance.value / 1000; // Convert meters to kilometers
      return distance;
    } else {
      // Handle case where the distance could not be calculated
      console.error(
        "Distance could not be calculated:",
        data.rows[0].elements[0].status
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching distance from Google Maps API:", error);
    return null;
  }
}

export const calculateTotalPrice = (details: Details, distance: number) => {
  const { base_amount, amount_per_km, base_kms } = details;
  if (distance <= base_kms) {
    return base_amount;
  } else {
    return base_amount + (distance - base_kms) * amount_per_km;
  }
};
