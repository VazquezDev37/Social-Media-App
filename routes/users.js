const User = require('../models/user'); 
const express = require('express'); 
const router = express.Router(); 
 
// All endpoints and route handlers go here 

router.get('/', async (req, res) => { 
    try { 
   
      // Need to validate body before continuing 
       
      const user = new User({ 
        name: req.body.name, 
        description: req.body.description, 
        category: req.body.category,  
      }); 
   
      await user.save(); 
   
      return res.send(user); 
    } catch (ex) { 
      return res.status(500).send(`Internal Server Error: ${ex}`); 
    } 
  });

 
module.exports = router;