const mongoose = require("mongoose");

const connectDB = async (url) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to db successfully!");
};

module.exports = connectDB;
