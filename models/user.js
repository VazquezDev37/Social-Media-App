const mongoose = require('mongoose');
const config = require('config'); 
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({ 
  username: { type: String, required: true, minlength: 3, maxlength: 20 }, 
  email: { type: String, required: true, max: 50, unique: true }, 
  password: { type: String, required: true, minlength: 6 },  
  profilePicture: { type: String, default:'' },
  coverPicture: { type: String, default:'' },
  followers: { type: Array, default:[] },
  isAdmin: { type: Boolean, default: false },
},
 { timestamps: true }, 

);

userSchema.methods.generateAuthToken = function () { 
  return jwt.sign({ _id: this._id, username: this.username, isAdmin: this.Admin }, config.get('jwtSecret')); 
};

// convert the userSchema to a  custom mongoose model
const User = mongoose.model('User', userSchema );


function validateUser(User) { 
  const schema = Joi.object({ 
    username: Joi.string().min(5).max(50).required(),
     email: Joi.string().min(5).max(255).required().email(),
     password: Joi.string().min(5).max(1024).required(),
  });
  
  const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength:5, maxlength:50 },
    email: {type: String,required:true, minlength:5, maxlength:225},
    password: {type: String,required:true, minlength:10, maxlength:225},
    // friends:{ type: [friendSchema], default:[]},
    });
    
//jsonwebtoken method t genrate webtoken
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, name: this.name }, config.get('jwtSecret'))
};

const statusSchema = new mongoose.Schema({
    text:{type:String, required: true,minlength:2,maxlength:150},
    email:{type:String,required: true,minlength:2,maxlength:150},
});

const Status = mongoose.model('Status',statusSchema);

  //Validation
  return schema.validate(User); 
} 

function validateLogin(req) {
  const schema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(1024).required(),
 });
  return schema.validate(req); }

exports.User = User
exports.validate = validateUser;
exports.userSchema = userSchema;
