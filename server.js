const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex')
const saltRounds = 10;
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const pg = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'arun',
    password : '',
    database : 'arun'
  }
});

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
        


//Image Entries(Rank)--------------
app.put('/image',  (req, res) => {
pg('users')
.where('id', '=', req.body.id)
.increment('entries',1)
.returning('entries')
.then(entries => res.json(entries))
})

//Signin--------------
app.post('/signin', (req,res) => signin.handleUserSignin(req,res,pg,bcrypt) )

//Register--------------
app.post('/register', (req,res) => {register.handleUserRegistration(req,res,pg, bcrypt, saltRounds)})

//Profile get------------   
app.get('/profile/:id', (req, res) => {  
   res.send('hello world');
})

var port = process.env.PORT || 5000;
app.listen(process.env.PORT || 3000);
