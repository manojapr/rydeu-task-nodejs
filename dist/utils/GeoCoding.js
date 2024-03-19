"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalPrice = exports.calculateDistance = void 0;
function calculateDistance(pickupAddress, destinationAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.GEOCODING_API;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickupAddress)}&destinations=${encodeURIComponent(destinationAddress)}&key=${apiKey}`;
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            if (data.rows[0].elements[0].status === "OK") {
                const distance = data.rows[0].elements[0].distance.value / 1000; // Convert meters to kilometers
                return distance;
            }
            else {
                // Handle case where the distance could not be calculated
                console.error("Distance could not be calculated:", data.rows[0].elements[0].status);
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching distance from Google Maps API:", error);
            return null;
        }
    });
}
exports.calculateDistance = calculateDistance;
const calculateTotalPrice = (details, distance) => {
    const { base_amount, amount_per_km, base_kms } = details;
    if (distance <= base_kms) {
        return base_amount;
    }
    else {
        return base_amount + (distance - base_kms) * amount_per_km;
    }
};
exports.calculateTotalPrice = calculateTotalPrice;
