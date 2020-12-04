import mongoose, { Schema } from 'mongoose';
import { User } from '../../interfaces/user.interface';


const UserSchema: Schema<User> = new Schema({
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

   phone: {
      type: String,
      required: [true, 'Please enter a valid phone']
   },

   isAdmin: {
      type: Boolean,
      default: false,
      required: true,
   },

   isSteward: {
      type: Boolean,
      default: false,
      required: true,
   },
   isManager: {
      type: Boolean,
      default: false,
      required: true,
   },
   isCompany: {
      type: Boolean,
      default: false,
      required: true,
   }

})

const User = mongoose.model('users', UserSchema);

module.exports = User;
