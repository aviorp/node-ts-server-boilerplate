"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authHandlers_1 = require("../core/authHandlers");
const userHandlers_1 = require("../core/userHandlers");
const express = require('express');
const router = express.Router();
router.post('/register', async (req, res, next) => {
    try {
        let isAlreadyRegistered = await userHandlers_1.checkIfUserExist(req.body.email);
        if (isAlreadyRegistered) {
            return await res.status(409).send('User Already Exist.');
        }
        const newUser = await authHandlers_1.register(req.body);
        await res.status(201).send(newUser);
    }
    catch (error) {
        next(error);
    }
});
router.post('/login', async (req, res, next) => {
    let { email, password } = req.body;
    try {
        let isExist = await userHandlers_1.checkIfUserExist(email);
        let user = await userHandlers_1.getUserByEmail(email);
        if (isExist) {
            let isValid = await authHandlers_1.comparePasswords(password, user.password);
            if (isValid) {
                const token = await authHandlers_1.generateToken(user);
                return await res.status(201).send(token);
            }
            return res.status(401).send('Username or Password Invalid');
        }
        else {
            return res.status(401).send('User not exist.');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map