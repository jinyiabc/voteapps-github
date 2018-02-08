const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Get a list of polls from the db
router.get('/:userId/polls',function(req,res,next){
  res.send({userId:req.params.userId});
});


// Add a new poll to the db
router.post('/:userId/polls',function(req,res,next){
  const query = {'github.username':req.params.userId};
//   req.body = {
// 	              "title":"Thor or Camption America?",
// 	              "options":["Thor","Camption America","Iron Man"]
//              }
  const update = {polls: {
                        $each:[ req.body ],
                        $sort: { score: -1 }
                      }
                 };
  User.findOneAndUpdate(query,{$push:update},{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.

    User.findOne(query).then(function(user){
      res.send(user);
    })
  }).catch(next);

});

// Update a poll in the db
router.put('/:userId/polls/:id',function(req,res,next){
  const query = { polls:{
                        "$elemMatch": {_id:req.params.id}
                        }};
  // const query = { 'polls._id':req.param.id};
  const update = {
                  title: req.body.title,
                  options: req.body.options
                };

  // User.find(query).then(function(user){
  //   res.send(user);
  // });
  User.findOneAndUpdate(query,update,{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.

    User.findOne(query).then(function(user){
      res.send(user);
    })
  }).catch(next);
});

// Delete a poll from the db
router.delete('/:userId/polls/:id',function(req,res,next){
  const query = {_id:req.params.id};
  User.findOneAndRemove(query).then(function(user){
    res.send(user);
  }).catch(next);
});


module.exports = router;
