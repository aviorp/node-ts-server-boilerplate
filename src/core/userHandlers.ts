import { User } from '../interfaces/user.interface'
const User = require("../db/models/User");

export const getAllUsers = ():User[] => {
   return User.find({})
}

export const getUserById = (id:string) :User => {
 return User.findById(id);
}

export const checkIfUserExist =(email:string) :Promise<boolean> => {
    return User.exists({email});
}

export const getUserByEmail = (email:string) :User => {
    return User.findOne({email})
}