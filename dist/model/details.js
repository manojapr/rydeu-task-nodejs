"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rydeu = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const detailsSchema = new mongoose_1.Schema({
    flag: { type: "boolean", default: false, required: true },
    country: { type: "string", required: true },
    city: { type: "string", required: true },
    vehicleType: { type: "string", required: true },
    amount_airport_fees: { type: "number", required: true },
    amount_per_hours: { type: "number", required: true },
    amount_per_km: { type: "number", required: true },
    base_amount: { type: "number", required: true },
    base_kms: { type: "number", required: true },
});
exports.Rydeu = mongoose_1.default.models.Rydeu || mongoose_1.default.model("Rydeu", detailsSchema);
