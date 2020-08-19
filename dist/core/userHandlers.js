"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.checkIfUserExist = exports.getUserById = exports.getAllUsers = void 0;
const User = require("../db/models/User");
exports.getAllUsers = () => {
    return User.find({});
};
exports.getUserById = (id) => {
    return User.findById(id);
};
exports.checkIfUserExist = (email) => {
    return User.exists({ email });
};
exports.getUserByEmail = (email) => {
    return User.findOne({ email });
};
//# sourceMappingURL=userHandlers.js.map