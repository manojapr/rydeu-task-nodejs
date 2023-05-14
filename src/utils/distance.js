const { Client } = require('@googlemaps/google-maps-services-js');

const getDistance = async (loc, dest) => {
  const gMapsClient = new Client();
  const key = process.env.API_KEY;
  let res = await gMapsClient.geocode({
    params: {
      key,
      address: loc,
    },
  });
  const origin = res.data.results[0].geometry.location;

  res = await gMapsClient.geocode({
    params: {
      key,
      address: dest,
    },
  });
  const destination = res.data.results[0].geometry.location;

  res = await gMapsClient.distancematrix({
    params: {
      key,
      origins: [origin],
      destinations: [destination],
      mode: 'driving',
    }
  });
  // console.log(JSON.stringify(res.data.rows));
  const distance = res.data.rows[0].elements[0].distance.value;
  // console.log(distance);
  return distance / 1000;
};

const getCity = async address => {
  const gMapsClient = new Client();
  const res = await gMapsClient.geocode({
    params: {
      key: process.env.API_KEY,
      address,
    },
  });

  const cityDetails = res.data.results[0].address_components.find(ob =>
    ob.types.includes('locality')
  );

  return cityDetails.long_name;
};

module.exports = { getDistance, getCity };
