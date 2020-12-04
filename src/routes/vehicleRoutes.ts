import { AuthInfo } from './../interfaces/authInfo.interface';
import { getVehicles, updateVehicleIssue } from './../core/vehicleHandlers';
import { Router, Request, Response, NextFunction } from 'express';

const express = require("express");
const router: Router = express.Router();


/**
 * This function return all the vehicles in the collection.
 * @returns vehicles;
 */
router.get('/getVehicles', async (req: Request, res: Response, next: NextFunction) => {
    const io = req.app.get("socketio");
    const authInfo: AuthInfo = req.app.get("authInfo");
    
    if (authInfo.isAdmin) {
        io.emit("confirm", "רוצה לאשר ??");
    }
    try {
        let vehicles = await getVehicles();
        return res.status(200).send(vehicles);
    } catch (error) {
        next(error)
    }
});

/**
 * This function gets an id and text from the user , and push a new vehocle issue to the history array.
 */

router.patch('/openVehicleIssue', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { id, text } = req.body;
        await updateVehicleIssue(id, text);
        return res.status(200).send("הקריאה התקבלה");
    } catch (error) {
        next(error)
    }
})


export default router;