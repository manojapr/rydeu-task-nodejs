import axios, { AxiosResponse } from 'axios';

interface MapApiResponse<T> {
  results: T[];
}

interface Location {
  latLng: {
    lat: number;
    lng: number;
  };
}

async function getGeoLocation(address: string, key: string): Promise<Location> {
  const endpoint = 'https://www.mapquestapi.com/geocoding/v1/address';

  const params = {
    key,
    location: address,
  };

  try {
    const response: AxiosResponse<MapApiResponse<Location>> = await axios.get(
      endpoint,
      { params }
    );
    const data: any = response.data;

    if (data.results && data.results.length > 0) {
      const location = data.results[0].locations[0].latLng;
      return location;
    } else {
      throw new Error('Failed to retrieve geolocation');
    }
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    throw new Error('Failed to retrieve geolocation');
  }
}

export async function distanceCalculator(
  pickupAddress: string,
  destinationAddress: string,
  key: string
): Promise<any> {
  try {
    const pickupLocation: any = await getGeoLocation(pickupAddress, key);
    const destinationLocation: any = await getGeoLocation(
      destinationAddress,
      key
    );

    const endpoint = 'https://www.mapquestapi.com/directions/v2/route';

    const params = {
      key,
      from: `${pickupLocation.lat},${pickupLocation.lng}`,
      to: `${destinationLocation.lat},${destinationLocation.lng}`,
    };

    const response: AxiosResponse<MapApiResponse<{ distance: number }>> =
      await axios.get(endpoint, { params });
    const data = response.data;

    if (data.results && data.results.length > 0 && data.results[0].distance) {
      const distanceInKilometers = data.results[0].distance;
      return distanceInKilometers;
    } else {
      throw new Error('Unable to calculate distance');
      return false;
    }
  } catch (error) {
    console.error('Error calculating distance:', error);
    return false;
    // throw new Error('Unable to calculate distance');
  }
}

// ________________USE BELOW FUNCTION IF ABOVE API DOES NOT WORk

// export async function distanceCalculator(
//   pickupAddress: string,
//   destinationAddress: string,
//   key: string
// ): Promise<number | false> {
//   try {
//     // Define predefined distances based on cities
//     const predefinedDistances: Record<string, Record<string, number>> = {
//       London: {
//         London: 0,
//         Berlin: 930,
//         Paris: 344,
//         Barcelona: 1418,
//         Amsterdam: 357,
//       },
//       Berlin: {
//         London: 930,
//         Berlin: 0,
//         Paris: 878,
//         Barcelona: 1379,
//         Amsterdam: 577,
//       },
//       Paris: {
//         London: 344,
//         Berlin: 878,
//         Paris: 0,
//         Barcelona: 1045,
//         Amsterdam: 431,
//       },
//       Barcelona: {
//         London: 1418,
//         Berlin: 1379,
//         Paris: 1045,
//         Barcelona: 0,
//         Amsterdam: 1459,
//       },
//       Amsterdam: {
//         London: 357,
//         Berlin: 577,
//         Paris: 431,
//         Barcelona: 1459,
//         Amsterdam: 0,
//       },
//     };

//     const pickupCity = pickupAddress.split(',')[0];
//     const destinationCity = destinationAddress.split(',')[0];
//     const distance = predefinedDistances[pickupCity][destinationCity];

//     if (distance !== undefined) {
//       console.log('logging distance ', distance);
//       return distance;
//     } else {
//       throw new Error('Invalid cities provided');
//     }
//   } catch (error) {
//     console.error('Error calculating predefined distance:', error);
//     return false;
//   }
// }
