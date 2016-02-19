// --- call the packages we need
var express = require('express');  // express is a library
var app = express(); // we are calling the express function
var bodyParser = require('body-parser');

// when starting up, use the 'animals' database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals'); //animals = the database that exists or will be created

var bearRouter = require('./routes/bears');

var Bear = require('./models/bear');

// app.use = mounting/requiring/using middleware (middleware is software that acts as a bridge between OS/database and applications)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));  // config node app to know what to do with files in public folder (they will be served as static files)

app.set('view engine', 'ejs'); // view engine config allows us to render our index.ejs in our browser

app.get('/', function(req, res){
	res.render('index', {title: "ejs viewing magic"});  //index.ejs file will show in browser at localHost:8080
});

app.get('/about', function(req, res){  //we hardcode values in a variable when we are not reaching out to a dbase
    var data ={};
    data.title ="About Page";
    data.name = "Cristine";
    data.time = new Date();
    res.render('about', data)
});

app.get('/bears', function(req, res){  // when we have a database, 
	Bear.find(function(err, data){   //node style 'error first callback' (err, bears).  If all goes well with Bear.find, the results are returned in the 'bear' argument.  If something goes wrong, the first 'err' argument will be populated with an error object containing information about the problem.
    		if(err){
    			console.log(err);
    		} else {
    			res.render('bears', { bears: data }) // bears value pulling from bears.js
    			          //'bears' = '/bears' url
    			          // bears: = an object that we can use in .ejs, that has info from Bear.find
    			          // data = value from function parameter above
    		}
    	})
});

var port = process.env.PORT || 8080;   // set our port

var router = express.Router();   // get an instance of router


router.use(function(req, res, next){
	console.log('something is happening!');
	next();
});

// '/' = the path off of the app.use ('/api') to see the 
router.get('/', function(req, res){
	res.json({message: "horray! you are looking at Cristine's CRUD bear project!"});
});


// all of our routes (router.xx) will be prefixed with /api
app.use('/api', bearRouter);

app.listen(port); // starts the server (node is server-side js; when we debug, we do it in our terminal)
console.log('magic happens on port '+ port);  // test the server