import axios from 'axios';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json`;

export const getDistanceAndTime = async (source: string, destination: string) => {
  try {
    const response = await axios.get(
      `${distanceMatrixUrl}?units=metric&origins=${source}&destinations=${destination}&key=${apiKey}`
    );
    const data = response.data;

    if (!data || !data.rows || !data.rows.length || !data.rows[0].elements || !data.rows[0].elements.length) {
      throw new Error('Invalid response received from Google Maps API');
    }

    const distance = data.rows[0].elements[0].distance.value / 1000;
    const time = data.rows[0].elements[0].duration.text / 3600;

    // const distance=28;
    // const time=2;

    return { distance: Number(distance), time };
  } catch (error) {
    throw new Error(`Failed to get distance and time from Google Maps API: ${error}`);
  }
};