import { dist } from '../model/distance-model';
import Vehicle from '../model/vehicle-model';

export const getAuth = async (req,res) => {
    const {origin,dest,city,vehicle_type} = req.body;
    let auth,distance,amountPerKm,finalPrice,priceAmount;
    try{
        amountPerKm = await Vehicle.findOne({vehicle_type});
        priceAmount = parseFloat(amountPerKm.amount_per_km);
        distance = dist(origin.toLowerCase(),dest.toLowerCase(),city.toLowerCase());
    } catch(err) {
        console.log(err);
        return res.status(500).json({"MongoDB error" : err});
    }

    if(distance) {
        finalPrice = priceAmount*distance;
    } else {
        return res.status(404).json({"Email Needed" : auth + " because city is not flagged!!!"});
    }
    
    if(distance>30 || finalPrice<50) {
        auth = true;
    } else {
        auth = false;
    }

    return res.status(200).json({"Email Needed" : auth});
}




