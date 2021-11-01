const {User, validateUser} = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../routes/auth'); 
const express = require('express'); 
const router = express.Router(); 
 
// All endpoints and route handlers go here 

router.get('/', async (req,res) => {
  try {
      const users = await User.find();
      return res.send(users);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error:‘${ex}`);
  }
});
router.get('/:id', async (req,res) => {
  try{
      const user = await User.findById(req.params.id);
      if(!user)
      return status(400).send(`the product with id “${req.quest.params}“does not exist.`);
      return res.send(user)
  } catch {ex} {
      return res.status(500).send(`internal Server Error:${ex}`);
  }
});
router.post('/', async (req, res) => {
  try {
 const { error } = validate(req.body);
 if (error) return res.status(400).send(error.details[0].message);
 let user = await User.findOne({ email: req.body.email });
 if (user) return res.status(400).send('User already registered.');

 const salt = await bcrypt.genSalt(10);
 user = new User({
   name: req.body.name,
   email: req.body.email,
   password: await bcrypt.hash(req.body.password, salt),
 });
 await user.save();
 const token = jwt.sign(
     { _id: user._id,name: user.name},config.get('jwtSecret')
 );
 return res.header('x-auth-token',token)
           .header('access-control-expose-headers','x-auth-token')
           .send({ _id:user._id, name: user.name, email: user.email }); }
 catch (ex) {
 return res.status(500).send(`Internal Server Error: ${ex}`); }
 });


 
module.exports = router;