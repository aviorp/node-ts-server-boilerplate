"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.comparePasswords = exports.register = void 0;
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = require('../db/models/User');
const salt = bcrypt_nodejs_1.default.genSaltSync(10);
exports.register = (user) => {
    let { firstName, lastName, email, password } = user;
    if (!password) {
        throw new Error('Password is required for Registration');
    }
    let hashedPassword = bcrypt_nodejs_1.default.hashSync(password, salt);
    let newUser = new User({ firstName, lastName, email, password: hashedPassword });
    return newUser.save();
};
exports.comparePasswords = (userPassword, dbPassword) => {
    return bcrypt_nodejs_1.default.compareSync(userPassword, dbPassword);
};
exports.generateToken = (user) => {
    let { email, password, firstName, lastName } = user;
    return jsonwebtoken_1.default.sign({ email, password, firstName, lastName }, 'secretkey', { expiresIn: 86400 });
};
//# sourceMappingURL=authHandlers.js.map