const express = require("express");
require("dotenv").config();
const errorMiddleware = require("./middleware/error.middlewares");
const connectDB = require("./db/connect");
const pricingRouter = require("./routes/pricing.routes");
const { StatusCodes } = require("http-status-codes");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
  res.status(StatusCodes.OK).json({message : "Task done by V. Gnana Chandra", portfolio : "https://portfolio-gnanachandra.vercel.app/", deployedIn : "Google Cloud App Engine"})
})
app.use("/api/pricing", pricingRouter);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

start();

app.use(errorMiddleware);
