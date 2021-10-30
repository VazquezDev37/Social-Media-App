const mongoose = require('mongoose'); 
 
const userSchema = new mongoose.Schema({ 
  username: { type: String, required: true, minlength: 3, maxlength: 20, unique: true }, 
  email: { type: String, required: true, max: 50, unique: true }, 
  password: { type: String, required: true, minlength: 6 },  
  profilePicture: { type: String, default:'' },
  coverPicture: { type: String, default:'' },
  followers: { type: Array, default:[] },
  following: { type: Array, default:[] },
  isAdmin: { type: Boolean, default: false },
},
 { timestamps: true }, 

);

const User = mongoose.model('user', userSchema); 

module.exports = User;