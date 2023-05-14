const express = require('express');
require('express-async-errors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const { priceRouter } = require('./routes/price');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
  res.end();
});

app.use('/api/price', priceRouter);

app.listen(5000, () => console.log('listening on 5000'));
