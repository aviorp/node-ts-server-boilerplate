import {UserLoginCredetials, User} from '../interfaces/user.interface';
import {register, comparePasswords, generateToken} from '../core/authHandlers';
import { checkIfUserExist, getUserByEmail } from '../core/userHandlers';
import {Router, Request,Response, NextFunction } from 'express';
const express = require('express')
const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let isAlreadyRegistered: boolean = await checkIfUserExist(req.body.email);
        if (isAlreadyRegistered) {
            return await res.status(409).send('User Already Exist.')
        }
        const newUser = await register(req.body);
        await res.status(201).send(newUser);
    } catch (error) {
        next(error)
    }
});


router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    let {
        email,
        password
    }: UserLoginCredetials = req.body;
    try {
        let isExist: boolean = await checkIfUserExist(email);
        let user: User = await getUserByEmail(email);
        if (isExist) {
            let isValid = await comparePasswords(password, user.password);
            if (isValid) {
                const token = await generateToken(user);
              return await res.status(201).send(token);
            }
            return res.status(401).send('Username or Password Invalid')
        } else {
            return res.status(401).send('User not exist.')
        }
    } catch (error) {
        next(error)
    }
});


export default router;
