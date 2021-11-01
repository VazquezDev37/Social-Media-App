const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const config = require('config'); 
const router = require('express').Router();
const { User, validate } = require('../models/user');



router.post('/', async (req, res) => { 
    try { 
      const { error } = validateLogin(req.body); 
      if (error) return res.status(400).send(error.details[0].message); 
   
      let user = await User.findOne({ email: req.body.email }); 
      if (!user) return res.status(400).send('Invalid email or password.'); 
   
      const validPassword = await bcrypt.compare(req.body.password, user.password); 
   
      if (!validPassword) return res.status(400).send('Invalid email or password.')
        const token = user.generateAuthToken();
      
   
      return res.send(token); 
    } catch (ex) { 
      return res
        .header('x-auth-token', token) 
        .header('access-control-expose-headers', 'x-auth-token') 
        .send({ _id: user._id, name: user.name, email: user.email }); 
    } 
  });

        //Register

router.get('/register', async (req,res) => {
    try { 
        const { error } = validate(req.body);
        if (error)
        return res.status(400).send(error);

        const user =  await new user({
        username:'Erika',
        email:'erika@mail.com',
        password:'12345678'

    });

    
        await user.save();

        return res.send(User); 
    } catch (ex) { 
      return res.status(500).send(`Internal Server Error: ${ex}`); 
    } 
});


    function validateLogin(req) { 
    const schema = Joi.object({ 
      email: Joi.string().min(5).max(255).required().email(), 
      password: Joi.string().min(5).max(1024).required(), 
    }); 
    return schema.validate(req); 
  } 

  function auth(req, res, next) { 
     
    const token = req.header('x-auth-token'); 
    if (!token) return res.status(401).send('Access denied. No token provided.'); 
   
    try { 
      const decoded = jwt.verify(token, config.get('jwtSecret')); 
      req.user = decoded; 
      return next(); 
    } catch (ex) { 
      return res.status(400).send('Invalid token.'); 
    } 
   
  } 

module.exports = router;
module.exports = auth;