//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;
const helpers = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    if (req.session.user) {
      return res.redirect('/protected');
    }else {
      res.render('userLogin');
    }
  })

router
  .route('/protected')
  .get(async (req, res) => {
    res.render('private',{username: req.session.user.username});
  })

router
  .route('/login')
  .post(async (req, res) => {
    let result;
    try{
      helpers.validUsername(req.body.usernameInput);
      helpers.validPassword(req.body.passwordInput);
      result = await users.checkUser(req.body.usernameInput,req.body.passwordInput);
    }catch(e){
      console.log("Error: ",e);
      res.status(400).render('userLogin',{error: e});
      return;
    }
    if(result.authenticatedUser){
      req.session.user = {username: req.body.usernameInput};
      res.redirect('/protected');
    } else {
      res.redirect('/');
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    if (req.session.user) {
      return res.redirect('/protected');
    }else {
      res.render('userRegister');
    }
  })
  .post(async (req, res) => {
    let result;
    try{
      helpers.validUsername(req.body.usernameInput);
      helpers.validPassword(req.body.passwordInput);
      result = await users.createUser(req.body.usernameInput,req.body.passwordInput);
    }catch(e){
      console.log("Error: ",e);
      res.status(400).render('userRegister',{error: e});
      return;
    }
    console.log(result);
    if(result.insertedUser){
      res.redirect('/');
    } else {
      res.status(500).send("Internal Server Error")
    }
    
  })


router
  .route('/logout')
  .get(async (req, res) => {
    req.session.destroy();
    res.render('logout');
  })

module.exports = router;
