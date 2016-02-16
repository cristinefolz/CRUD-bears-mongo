// --- call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// when starting up, use the 'animals' database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals'); //animals = the database that exists or will be created

// mounting/requiring/using middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;   // set our port


var router = express.Router();   // get an instance of router

router.get('/', function(req, res){
	res.json({message: "horray! you are looking at Cristine's CRUD bear project!"});
});

// all of our routes will be prefixed with /api
app.use('/api', router);


app.listen(port);
console.log('magic happens on port '+ port);