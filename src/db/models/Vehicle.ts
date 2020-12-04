import mongoose, { Schema } from 'mongoose';
import { Vehicle } from "../../interfaces/vehicle.interface";


const vehicleSchema: Schema<Vehicle> = new Schema({
    type: {
        type: String,
        required: true,
    },
    seatsNumber: {
        type: Number,
        required: true,
    },
    kilometers: {
        type: Number,
        required: true,
    },
    fuelStatus: {
        type: Number,
        required: true,
    },
    history: {
        type: Array,
        required: true,
        default: [],
    },
    isApprovedForKids: {
        type: Boolean,
        default: false,
    }

})

const Vehicle = mongoose.model('vehicles', vehicleSchema);

module.exports = Vehicle;
