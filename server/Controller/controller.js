const helpers = require('../Helpers/Helpers')
const axios = require('axios');
module.exports.postMethod = async (req, res) => {

    let { Pickup } = req.body;
    let { Destination } = req.body
    let { Vehicle } = req.body;
    let email = null;
    if (req.body.email)
        email = req.body.email

    data = await axios.post('http://localhost:3000/fetchDistance', { Pickup, Destination })
    distance = data.data
    ratePerKm = await helpers.Fare(Pickup, Vehicle)
    price = distance * ratePerKm

        
        if (!(Pickup == "London" || Pickup == "Paris"))
        if (distance > 30 || price < 50)
        if (!email)
        return res.json(true);

    res.json(price + ' Rs');
}
module.exports.fetchDistance = async (req, res) => {
    let { Pickup } = req.body;
    let { Destination } = req.body
    res.json(helpers.distance(Pickup, Destination));
}