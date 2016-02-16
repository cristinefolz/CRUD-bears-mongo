// --- call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// mounting/requiring/using middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;   // set our port


var router = express.Router();   // get an instance of router

router.get('/', function(req, res){
	res.json({message: 'horray! welcome to our api!'});
});


app.use('/api', router);


app.listen(port);
console.log('magic happens on port '+ port);