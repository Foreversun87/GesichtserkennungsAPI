const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const knex = require('knex');
const db = knex ({
      client: 'pg',
      connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'smart-brain'
    }
  });
  // Für bcrypt
const saltRounds = 10;
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
    
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send(database.users);
})

//Dies ist nur eine andere Schreibweise wie die anderen Funktionen ==> beachte signin.js
app.post('/signin',  signin.handleSignin (db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister (req, res, db, bcrypt, saltRounds) })
app.get('/profile/:id', (req,res) => { profile.handleProfile (req,res,db)})
app.put('/image', (req,res) => {image.handleImage(req,res, db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})


app.listen(3001, () =>{
    console.log('app is running on port 3001');
})