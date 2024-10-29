const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { 
    type: String, 
    unique: true,
    minlength: [4, 'Minimum username length is 4 characters'],
    required: [true, 'Username is required']
  },
  password: { 
    type: String, 
    minlength: [8, 'Minimum password length is 8 characters'],
    required: [true, 'Password is required'],
  }
});

//hash password before saving to database
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;