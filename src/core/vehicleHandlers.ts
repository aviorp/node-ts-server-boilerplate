import { Vehicle } from './../interfaces/vehicle.interface';

const Vehicle = require("../db/models/Vehicle");




export const getVehicles = (): Vehicle[] => Vehicle.find();

export const getVehicleById = (id: string): Vehicle => Vehicle.find({ id })



export const updateVehicleIssue = (id: string, text: string) => Vehicle.updateOne(
    { _id: id }, { $push: { history: { date: new Date().toISOString().substr(0, 10), text, isCompleted: false, } } }
)
