const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require("body-parser");
const price = require("./modules/price");
const email = require("./modules/emailShare");
app.use(bodyParser.json());
app.post(`/price`, (req, res, next) => {
  console.log(req.body);
  const pickUp = req.body.pickUp.toLowerCase();
  const destination = req.body.drop.toLowerCase();
  price
    .priceCalculate(pickUp, destination)
    .then((result) => {
      if (result) {
        email
          .isemailrequired(result, pickUp, destination)
          .then((result) => {
            if (result[1] > 5000) res.status(200).send("Distance is too far");
            else res.status(200).send(result[0]);
          })
          .catch((err) => res.status(500).send(err));
      } else {
        res.status(500).send("City not available");
      }
    })
    .catch((err) => res.status(500).send(err));
});
//The 404 status
app.get("*", function (req, res) {
  res.status(404).send("Page not found");
});
app.listen(PORT);
