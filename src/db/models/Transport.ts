import { Transport } from './../../interfaces/transport.interface';
import mongoose, { Schema } from 'mongoose';

const TransportSchema: Schema<Transport> = new Schema({
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },

    fromDate: {
        type: String,
        required: true,
    },
    toDate: {
        type: String,
        required: true,
    },
    fromTime: {
        type: String,
        required: true,
    },
    toTime: {
        type: String,
        required: true,
    },
    isPermanent: {
        type: Boolean,
        default: false,
    },
    seatsNumber: {
        type: Number,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    driverName: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: Number,
        required: true,
    },
    routes: {
        type: Array,
        required: true,
        default: [],
    },
    isActive: {
        type: Boolean,
        default: true,
    }

})

const Transport = mongoose.model('transports', TransportSchema);

module.exports = Transport;
