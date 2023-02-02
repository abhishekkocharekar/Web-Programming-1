//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express');
const router = express.Router();
const path = require('path');
const data = require('../data');
const peopleData = data.users;
const helper = require("../helper");

router.route("/").get(async (req, res) => {
  res.sendFile(path.resolve('static/homepage.html'));
});

router.route("/searchpeople").post(async (req, res) => {
  let peopleList;

  try{
    helper.searchValidation(req.body.searchPersonName)
  } catch(e){
    res.status(400).render('error', {title: "Bad Input",error: e});
    return;
  }

  try{
    peopleList = await peopleData.searchPeopleByName(req.body.searchPersonName.trim());
  } catch(e){
    res.status(404).render('personNotFound', { title: "Person Not Found",searchPersonName: req.body.searchPersonName});
    return;
  }
  

  res.render('peopleFound', {searched: req.body.searchPersonName, title: "People Found",people: peopleList});
});

router.route("/persondetails/:id").get(async (req, res) => {
  let peopleList;
  try{
    helper.idValidation(req.params.id)
  } catch(e){
    res.status(400).render('error', {title: "Bad Input",error: e});
    return;
  }
  try{
    peopleList = await peopleData.searchPeopleByID(req.params.id.trim());
  } catch(e){
    res.status(404).render('personNotFound', {title: "Person Not Found",searchPersonName: req.params.id});
    return;
  }
  res.render('personFoundById', {title: "Person Found",people: peopleList});
});


module.exports = router;