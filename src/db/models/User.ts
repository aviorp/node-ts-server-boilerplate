import mongoose, { Schema } from 'mongoose';


const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true , 'Please enter a valid Email'],
     unique: true
  },
  pasword: { 
    type: String,
    required: [true , 'Please enter a valid Password'],
   },
  firstName: {
     type: String,
      required: [true , 'Please enter a valid firstName'],
     },

  lastName: {
     type: String,
      required: [true , 'Please enter a valid last name']
     },
})

const User = mongoose.model('users', UserSchema);

module.exports = User;