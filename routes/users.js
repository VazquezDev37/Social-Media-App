const {User, validate} = require('../models/user');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const express = require('express'); 
const router = express.Router(); 
 
// All endpoints and route handlers go here 

//User Login
router.post('/login', async (req, res) => {
  try{
      const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password .');

  const token = user.generateAuthToken();
    return res.send(token);

  } catch (ex) {
  return res.status(500).send(`Internal Server Error: ${ex}`); }
  });

  function validateLogin(req) {
      const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required(), });
      return schema.validate(req); 
    
    }

  //register User
router.post('/register', async (req, res) => {
  try {
 const { error } = validate(req.body);
 if (error) return res.status(400).send(error.details[0].message);
 let user = await User.findOne({ email: req.body.email });
 if (user) return res.status(400).send('User already registered.');

 const salt = await bcrypt.genSalt(10);
 user = new User({
   username: req.body.username,
   email: req.body.email,
   password: await bcrypt.hash(req.body.password, salt),
 });
 await user.save();
 const token = jwt.sign(
     { _id: user._id,username: user.username},config.get('jwtSecret')
 );
 return res.header('x-auth-token',token)
           .header('access-control-expose-headers','x-auth-token')
           .send({ _id:user._id, username: user.username, email: user.email }); 
          }catch (ex) {
  return res.status(500).send(`Internal Server Error: ${ex}`); }
 });

 router.delete('/:id', async (req,res) => {
  try{
      const user = await User.findByIdAndRemove(req.params.id);
      if(!user)
      return res.status (400).send(`The product with id “${id.params.id}” does not exist`)
      return res.send(user)
  } catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
      }
});

//  CREATEPOST
router.post('/status/new.',async(req,res) => {
  try{
        const newStatus = new Status ({
          text:req.body.text,
        });
        await newStatus.save();
        return res.send(newStatus);
    }catch(ex) {
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
});

//DELETE A POST
router.delete('/delete/:id', async (req, res) => {
try {
  const newStatus = await Status.findById(req.params.id);
  if (!newStatus)
  return res.status (400).send(`The post with id “${req.params.id}” does not exist`)
    await newStatus.deleteOne();
    return res.send('your status has been updated')
} catch (ex) {
  return res.status(500).send(`Internal Server Error:${ex}`);
}
});


//  CREATEPOST
router.post('/status/new',async(req,res) => {
  try{
        const newStatus = new Status ({
          text:req.body.text,
        });
        await newStatus.save();
        return res.send(newStatus);
    }catch(ex) {
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
});

//DELETE A POST
router.delete('/delete/:id', async (req, res) => {
try {
  const newStatus = await Status.findById(req.params.id);
  if (!newStatus)
  return res.status (400).send(`The post with id “${req.params.id}” does not exist`)
    await newStatus.deleteOne();
    return res.send('your status has been updated')
} catch (ex) {
  return res.status(500).send(`Internal Server Error:${ex}`);
}
});

module.exports = router;