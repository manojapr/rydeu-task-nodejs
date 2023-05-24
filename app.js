const express = require('express');
const mongoose = require('mongoose');
const pricingRoutes = require('./routes/pricing.routes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/pricingdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Populate the database with initial pricing data
    populateDatabase();
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Register routes
app.use('/', pricingRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Function to populate the database with initial pricing data
async function populateDatabase() {
  const City = require('./models/city.model');

  try {
    // Check if the city exists
    const existingCity = await City.findOne({ name: 'London' });
    if (existingCity) {
      return;
    }

    // Create a new city with pricing data
    const city = new City({
      name: 'London',
      flag: false,
      pricing: [
        {
          vehicleType: 'Economy',
          amountAirportFees: 5,
          amountPerHour: 60,
          amountPerKm: 2,
          baseAmount: 35,
          baseKm: 15,
        },
        {
          vehicleType: 'Comfort',
          amountAirportFees: 8,
          amountPerHour: 65,
          amountPerKm: 3,
          baseAmount: 45,
          baseKm: 15,
        },
        {
          vehicleType: 'Minivan',
          amountAirportFees: 10,
          amountPerHour: 70,
          amountPerKm: 5,
          baseAmount: 55,
          baseKm: 15,
        },
      ],
    });

    // Save the city to the database
    await city.save();
    console.log('City data populated in the database');
  } catch (error) {
    console.error('Failed to populate city data:', error);
  }
}
