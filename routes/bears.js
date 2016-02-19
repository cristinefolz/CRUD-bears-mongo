var express = require('express');
var router = express.Router();  // get an instance of router
var Bear = require('../models/bear');

router.route('/bears')  // localhost:8080/api/bears
	.post(function(req, res){

		var bear = new Bear(); // constructing a new bear from Bear constructor

		bear.name = req.body.name; // req.body = comes from the request (i.e. body of the input form)
		bear.age = req.body.age;
		bear.gender = req.body.gender;

		bear.save(function(err, bear){
			if(err){
				console.log(err);
			} else {
				res.json(bear);
			}
		})
	})

  .get(function(req, res){
  	Bear.find(function(err, bears){   //node style call back (err, bears).  If all goes well with Bear.find, the COLLECTION is returned in the 'bear' argument.  If something goes wrong, the first 'err' argument will be populated with an error object containing information about the problem.
  		if(err){
  			console.log(err);
  		} else {
  			res.json(bears);
  		}
  	})
  });



router.route('/bears/:bear_id') // the param(s) we are passing in come from the url itself (i.e. ':bear_id')
 .get(function(req, res){
 	 Bear.findById(req.params.bear_id, function(err, bear){  //req.params because the bear_id is coming in from the URL; findById comes with Mongoose
		if(err){
			console.log(err);
		} else {
			res.json(bear);
		}
 	 })
 })

 .put(function(req, res){
 	 Bear.findById(req.params.bear_id, function(err, bear){
 	 	if(err){
 	 		console.log(err);
 	 	} else {

 	 		bear.name = req.body.name ? req.body.name : bear.name;  //ternary expression (always returns a value)
 	 		bear.age = req.body.age ? req.body.age : bear.age;
 	 		bear.gender = req.body.gender ? req.body.gender : bear.gender;

 	 		bear.save(function(err, newBear){
 	 			if(err){
 	 				console.log(err);
 	 			} else {
 	 				res.json({title: 'bear updated'});
 	 			}
 	 		})
 	 	}
 	 })
 	})

 .delete(function(req, res){
 	 Bear.remove({_id: req.params.bear_id}, function(err, bear){
 	 	if(err){
			console.log(err);
 	 	} else{
 	 		res.json({title: 'bear was successfully deleted'});
 	 	}
 	 })
 });

 //  .post();

 module.exports = router;
