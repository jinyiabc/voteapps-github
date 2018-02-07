const express = require('express');
const router = express.Router();
const Poll = require('../models/polls');

// Get a list of polls from the db
router.get('/polls',function(req,res,next){
  res.send({type:'GET'})
});


// Add a new poll to the db
router.post('/polls',function(req,res,next){
  Poll.create(req.body).then(function(poll){
    res.send(poll)
  }).catch(next);

});

// Update a poll in the db
router.put('/polls/:id',function(req,res,next){
  const query = {_id:req.params.id};
  Poll.findOneAndUpdate(query,req.body,{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.

    Poll.findOne(query).then(function(poll){
      res.send(poll);
    })
  })
});

// Delete a poll from the db
router.delete('/polls/:id',function(req,res,next){
  const query = {_id:req.params.id};
  Poll.findOneAndRemove(query).then(function(poll){
    res.send(poll);
  }).catch(next);
});


module.exports = router;
