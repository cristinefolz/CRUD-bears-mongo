// --- call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// when starting up, use the 'animals' database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals'); //animals = the database that exists or will be created

var bearRouter = require('./routes/bears');

var Bear = require('./models/bear');

// mounting/requiring/using middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // config of app

app.get('/', function(req, res){
	res.render('index', {title: "ejs viewing magic"});  // view engine config allows us to render our index.ejs in our browser
});

app.get('/about', function(req, res){
    var data ={};
    data.title ="About Page";
    data.name = "Lauren";
    data.time = new Date();
    res.render('about', data)
});

app.get('/bears', function(req, res){
	Bear.find(function(err, bears){   //node style call back (err, bears).  If all goes well with Bear.find, the results are returned in the 'bear' argument.  If something goes wrong, the first 'err' argument will be populated with an error object containing information about the problem.
    		if(err){
    			console.log(err);
    		} else {
    			res.render('bears', { bears: bears }) // bears value pulling from bears.js
    		}
    	})
});

var port = process.env.PORT || 8080;   // set our port

var router = express.Router();   // get an instance of router


router.use(function(req, res, next){
	console.log('something is happening!');
	next();
});


router.get('/', function(req, res){
	res.json({message: "horray! you are looking at Cristine's CRUD bear project!"});
});


// all of our routes will be prefixed with /api
app.use('/api', bearRouter);

app.listen(port);
console.log('magic happens on port '+ port);