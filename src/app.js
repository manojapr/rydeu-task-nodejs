const express = require('express');
require('express-async-errors');
const dotenv = require('dotenv');
dotenv.config();
// const errorHandler = require('./middleware/error-handler');

const app = express();

const { priceRouter } = require('./routes/price');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
  res.end();
});

app.use('/api/price', priceRouter);
// app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
