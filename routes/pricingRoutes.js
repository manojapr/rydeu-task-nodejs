const express = require("express")
const router = express.Router();
const {addPricing, checkPricing} = require("../controllers/pricingController");

router.route("/addpricing").post(addPricing);
router.route("/checkpricing").post(checkPricing);

module.exports = router;