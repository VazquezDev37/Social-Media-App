const mongoose = require('mongoose');
const Joi = require('joi'); 
 
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

userSchema.methods.generateAuthToken = function () { 
  return jwt.sign({ _id: this._id, name: this.name, isAdmin: this.Admin }, config.get('jwtSecret')); 
};

const User = mongoose.model('User', userSchema);

function validateUser(user) { 
  const schema = Joi.object({ 
    name: Joi.string().min(5).max(50).required(),
     email: Joi.string().min(5).max(255).required().email(),
     password: Joi.string().min(5).max(1024).required(),
  }); 
  return schema.validate(user); 
} 

exports.validate = validateUser;
exports.userSchema = userSchema;
module.exports = User;