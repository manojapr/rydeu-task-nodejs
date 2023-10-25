require('dotenv').config();
const express = require("express");
const app = express();
const pricingRoutes = require("./routes/pricingRoutes");
const connectDB = require("./db/connect");

connectDB();

app.use(express.json());
app.use("/api", pricingRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
