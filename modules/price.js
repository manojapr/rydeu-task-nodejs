/**
 * As Gapi is not available hence we are using hardCode values without calculating the distance for price calculation
 */
const cities = ["delhi", "bihar", "boston"];
async function priceCalculate(pickup, dropOff) {
  if (cities.includes(pickup) && cities.includes(dropOff)) {
    //Handling the case
    if (pickup === dropOff) {
      return 1;
    } else if (pickup === "delhi" && dropOff === "bihar") {
      return 100;
    } else if (pickup === "delhi" && dropOff === "boston") {
      return 2500;
    } else if (pickup === "bihar" && dropOff === "delhi") {
      return 100;
    } else if (pickup === "bihar" && dropOff === "boston") {
      return 5400;
    } else if (pickup === "boston" && dropOff === "delhi") {
      return 2500;
    } else if (pickup === "boston" && dropOff === "bihar") {
      return 5400;
    } else {
      return false;
    }
  } else {
    //when city is not available
    return false;;
  }
}
exports.priceCalculate = priceCalculate;
