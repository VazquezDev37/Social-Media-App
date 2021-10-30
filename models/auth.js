const router = require('express').Router();
const { user, validate } = require('../models/user');


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

        return res.send(user); 
    } catch (ex) { 
      return res.status(500).send(`Internal Server Error: ${ex}`); 
    } 
});

module.exports = router;