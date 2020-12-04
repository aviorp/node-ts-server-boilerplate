import { Transport } from './../interfaces/transport.interface';
const Transport = require("../db/models/Transport");

export const createNewTransport = (transport: Transport) => {
    let newTransport = new Transport(transport);
    return newTransport.save();
}