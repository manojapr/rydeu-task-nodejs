const express = require("express")
const router = express.Router();
const {addPricing, checkPricing} = require("../controllers/pricing.controller");

router.route("/").post(addPricing);
router.route("/checkPricing").post(checkPricing);

module.exports = router;