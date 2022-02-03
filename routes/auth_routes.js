const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const mongoose = require("mongoose");

//Sign up
router.get('/signup', (req,res,next) => {
    res.render('auth/signup');
  });
  
router.post('/signup',(req,res,next) => {
    const {username, password} = req.body;
  
    if(!username || !password){
        res.render('auth/signup', {errorMessage: 'All fields are mandatory'});
        return;
    }

    bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          username: username,
          password: hashedPassword
        });
      })
      .then(userFromDB =>{
        res.redirect('/');
      })
      .catch(err => {
        let errorMessage = '';
        // if(err.indexOf('duplicate key') > -1){
        //   errorMessage = 'Username is already in use!';
        // }
        res.render('signup',{errorMessage});
        console.log('Error while creating user: ' + JSON.stringify(err));
      
      });
  });

//Log in
router.get('/login',(req,res,next) => {
    res.render('./auth/login');
});

module.exports = router;