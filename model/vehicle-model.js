import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const vehicleSchema = new Schema({
    vehicle_type : {
        type: String,
        required: true,
        unique: true
    },
    amount_per_km : {
        type: String,
        required: true
    }
});
export default mongoose.model("Vehicle",vehicleSchema);