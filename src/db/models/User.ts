import mongoose, {Schema} from 'mongoose';
import {User} from '../../interfaces/user.interface';


const UserSchema: Schema < User > = new Schema({
   email: {
      type: String,
      required: [true, 'Please enter a valid Email'],
      unique: true
   },
   password: {
      type: String,
      required: [true, 'Please enter a valid Password'],
   },
   firstName: {
      type: String,
      required: [true, 'Please enter a valid firstName'],
   },

   lastName: {
      type: String,
      required: [true, 'Please enter a valid last name']
   },
   isAdmin: {
      type: Boolean,
      default: false,
   }
})

const User = mongoose.model('users', UserSchema);

module.exports = User;
