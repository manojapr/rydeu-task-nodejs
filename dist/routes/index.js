"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RydeuRouter = void 0;
const express_1 = __importDefault(require("express"));
const rydueController_1 = require("../controllers/rydueController");
const router = express_1.default.Router();
exports.RydeuRouter = router;
//get all the pricings
router.get("/", rydueController_1.GetAllPricingData);
//post the pricing information
router.post("/add_pricing", rydueController_1.AddPricingInfo);
//get the ride info
router.post("/get_pricing", rydueController_1.GetPricingInfo);
