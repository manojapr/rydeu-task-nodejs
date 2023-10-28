import axios, { AxiosResponse } from 'axios';

interface MapQuestGeocodingResponse {
    results: {
        locations: { latLng: { lat: number; lng: number } }[];
    }[];
}

interface MapQuestDirectionsResponse {
    route: {
        distance: number;
    };
}

async function geocodeAddress(address: string, apiKey: string): Promise<{ lat: number; lng: number }> {
    const apiUrl = 'https://www.mapquestapi.com/geocoding/v1/address';

    const params = {
        key: apiKey,
        location: address,
    };

    try {
        const response: AxiosResponse<MapQuestGeocodingResponse> = await axios.get(apiUrl, { params });
        const data = response.data;

        if (data.results && data.results.length > 0) {
            const location = data.results[0].locations[0].latLng;
            return location;
        } else {
            throw new Error('Geocoding failed');
        }
    } catch (error) {
        console.error('Error fetching geocoding data from MapQuest API:', error);
        throw new Error('Geocoding failed');
    }
}

export async function calculateDistance(
    pickup: string,
    destination: string,
    apiKey: string
): Promise<number> {
    try {
        const pickupLocation = await geocodeAddress(pickup, apiKey);
        const destinationLocation = await geocodeAddress(destination, apiKey);

        const apiUrl = 'https://www.mapquestapi.com/directions/v2/route';

        const params = {
            key: apiKey,
            from: `${pickupLocation.lat},${pickupLocation.lng}`,
            to: `${destinationLocation.lat},${destinationLocation.lng}`
        };

        const response: AxiosResponse<MapQuestDirectionsResponse> = await axios.get(apiUrl, { params });
        const data = response.data;

        if (data.route && data.route.distance) {
            const distanceInKilometers = data.route.distance;
            return distanceInKilometers;
        } else {
            throw new Error('Unable to calculate distance');
        }
    } catch (error) {
        throw new Error('Unable to calculate distance');
    }
}

