// --- call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// when starting up, use the 'animals' database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals'); //animals = the database that exists or will be created

var Bear = require('./models/bear');

// mounting/requiring/using middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;   // set our port

var router = express.Router();   // get an instance of router


router.use(function(req, res, next){
	console.log('something is happening!');
	next();
});




router.get('/', function(req, res){
	res.json({message: "horray! you are looking at Cristine's CRUD bear project!"});
});

router.route('/bears')
	.post(function(req, res){

		var bear = new Bear();
		
		bear.name = req.body.name;
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
    	res.json({title: "i am trying to make a get"});
    });

//    .push();


// router.route('/bears/:bear_api')
//    .get();

//    .post();





// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('magic happens on port '+ port);