const connectDB = require('./startup/db'); 
const express = require('express'); 
const app = express();
const users = require('./routes/users');
const auth = require('./routes/auth');

 
connectDB(); 
 
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);


//app.get('/',(req,res)=> {
  //res.send('welcome to homepage')
//})

//app.get('/users',(req,res)=> {
  //res.send('welcome to user page')
//})
 
const port = process.env.PORT || 5000; 
app.listen(port, () => { 
  console.log(`Server started on port: ${port}`); 
}); 