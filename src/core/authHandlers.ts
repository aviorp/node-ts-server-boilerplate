import { User } from './../interfaces/user.interface';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
const User = require('../db/models/User');
const salt = bcrypt.genSaltSync(10);


export const register = (user: User) => {
  let { firstName, lastName, email, password } = user;

  if (!password) {
    throw new Error('Password is required for Registration');
  }
  let hashedPassword = bcrypt.hashSync(password, salt);
  let newUser = new User({ firstName, lastName, email, password: hashedPassword });

  return newUser.save();
}


export const comparePasswords = (userPassword:string , dbPassword:string) :boolean=>  {
  return bcrypt.compareSync(userPassword, dbPassword)
} 

export const generateToken = ( user:User ) => {
  let { email, password , firstName ,lastName}  = user;
  return jwt.sign({ email, password , firstName ,lastName} ,'secretkey' , {expiresIn:86400});

}