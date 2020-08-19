"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userHandlers_1 = require("../core/userHandlers");
const userHandlers_2 = require("../core/userHandlers");
const express = require("express");
const router = express.Router();
/**
 * The api fetch all the users data from the db
 *
 * @returns All the users info from the db.
 */
router.get('/', async (req, res, next) => {
    try {
        let users = await userHandlers_2.getAllUsers();
        res.status(200).send(users);
    }
    catch (error) {
        next(error);
    }
});
/**
 * The api fetch speific user data from the db
 *
 * @returns speific user info from the db.
 */
router.get('/:id', async (req, res, next) => {
    try {
        let user = await userHandlers_1.getUserById(req.params.id);
        if (user.email) {
            await res.status(200).send(user);
        }
        else {
            await res.status(204).send("Did not found the id");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map