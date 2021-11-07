const mongoose = require('mongoose');
const config = require('config'); 
const Joi = require('joi');
const jwt = require('jsonwebtoken');

//SCHEMA FOR REGISTERING NEW USER
const userSchema = new mongoose.Schema({ 
  username: { type: String, required: true, minlength: 3, maxlength: 20 }, 
  email: { type: String, required: true, max: 50, unique: true }, 
  password: { type: String, required: true, minlength: 6 },  
  followers: { type: Array, default:[] },
},
 { timestamps: true }, 

);

//JSONWEBTOKEN METHOD FOR USER SCHEMA
userSchema.methods.generateAuthToken = function () { 
  return jwt.sign({ _id: this._id, username: this.username, isAdmin: this.Admin }, config.get('jwtSecret')); 
};

// convert the userSchema to a  custom mongoose model
// SCHEMA FOR USER FRIENDS
// const friendSchema = new mongoose.Schema({
//     name: {type: String, required: true, minlength:5, maxlength:50 },
// });

// SCHEMA FOR NEW POST
const statusSchema = new mongoose.Schema({
  text:{type:String, required: true,minlength:2,maxlength:150},
  email:{type:String,required: true,minlength:2,maxlength:150},
});

// SCHEMA FOR NEW FRIEND REQUEST
const requestSchema = new mongoose.Schema({
  requesterId:{type:String, required:true, minlength:2,maxlength:150},
  requesteeId:{type:String, required:true, minlength:2,maxlength:150},
})

// CONVERT SCHEMA TO MONGOOSE MODEL
const User = mongoose.model('User', userSchema );
const Status = mongoose.model('Status',statusSchema);
const Request = mongoose.model('Request',requestSchema);

//VALIDATION
function validateUser(User)
  {const schema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(225).required(),
  password: Joi.string().min(10).max(225).required(),
});
return schema.validate(User);
}

function validateLogin(req) {
  const schema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(1024).required(),
 });
  return schema.validate(req); }


module.exports = {
  Request,
  Status,
  User,
  validateUser,
  validateLogin
} 
