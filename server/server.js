const express = require("express");
require("dotenv");

const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
