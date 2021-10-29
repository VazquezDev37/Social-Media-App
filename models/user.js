const mongoose = require('mongoose'); 
 
const userSchema = new mongoose.Schema({ 
  name: { type: String, required: true, minlength: 2, maxlength: 255 }, 
  description: { type: String, required: true }, 
  category: { type: String, required: true, minlength: 5, maxlength: 50 },  
  dateModified: { type: Date, default: Date.now }, 
});

const User = mongoose.model('User', userSchema); 

module.exports = User;