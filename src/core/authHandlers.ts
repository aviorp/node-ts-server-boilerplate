import { User, UserLoginCredetials } from './../interfaces/user.interface';
import bcrypt from 'bcrypt';

const User = require('../db/models/User');

export const register = (user: User) => {
  let { firstName, lastName, email, password } = user;
  let salt = bcrypt.genSaltSync(10);
  if (!password) {
    throw new Error('Password is required for Registration');
  }
  let hashedPassword = bcrypt.hashSync(password, salt);
  let newUser = new User({ firstName, lastName, email, password: hashedPassword });
  return newUser.save();
}


export const login = (userCredetials:UserLoginCredetials) => {
let {email,password} = userCredetials;
}