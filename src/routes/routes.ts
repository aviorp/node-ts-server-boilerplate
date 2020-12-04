import { verifyUser } from '../middlewares/auth';
import { getAllUsers , getUserById } from '../core/userHandlers';
import { Request, Response, NextFunction } from 'express';
import { User } from '../interfaces/user.interface';

const express = require("express");

const router = express.Router();

/**
 * The api fetch all the users data from the db
 * 
 * @returns All the users info from the db.
 */
 router.get('/', verifyUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        let users = await getAllUsers();
        res.status(200).send(users);
    }
    catch (error) {
        next(error)
    }
});

/**
 * The api fetch speific user data from the db
 * 
 * @returns speific user info from the db.
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user :User = await getUserById(req.params.id);
       if(user.email) {
        await res.status(200).send(user);
       } else {
        await res.status(204).send("Did not found the id")
       }
       
    } catch (error) {
        next(error)
    }
})

export default router;