const Fare = require('../models/Fare')

module.exports.Fare = async (Pickup,vehicle) => {
    let data = await Fare.findOne({ raw: true,where:{city:Pickup,vehicle_types:vehicle} });
    return data.Amount_Per_KM //returning the Amount per KM
}
module.exports.distance = (Pickup, des) => {
    switch (Pickup) {
        case "Paris":
            if (des == "London")
                return (1100)
            else if (des == "Berlin")
                return (1050)
            else if (des == "Barcelona")
                return (1030)
            else
                return (507);
            break;
        case "London":
            if (des == "Paris")
                return (1100)
            else if (des == "Berlin")
                return (688)
            else if (des == "Barcelona")
                return (932)
            else
                return (340);
            break;
        case "Berlin":
            if (des == "London")
                return (688)
            else if (des == "Paris")
                return (1050)
            else if (des == "Barcelona")
                return (1863)
            else
                return (507);
            break;
        case "Barcelona":
            if (des == "London")
                return (590)
            else if (des == "Berlin")
                return (348)
            else if (des == "Barcelona")
                return (590)
            else
                return (1000);
            break;
        case "Amsterdam":
            if (des == "London")
                return (1100)
            else if (des == "Berlin")
                return (1050)
            else if (des == "Barcelona")
                return (1030)
            else
                return (507);
            break;
        default : return 0;
            break;
    }
}