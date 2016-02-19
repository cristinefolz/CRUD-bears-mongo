// app/models/bear.js
// create schematic (representation for the outline of a Model) for our database bears
// when we create bears in our database, this is what they will each look like

var mongoose = require('mongoose');
var Schema = mongoose.Schema;  // constructor function

var BearSchema = new Schema({
	name: String,
	age: Number,
	gender: String,
});

module.exports = mongoose.model('Bear', BearSchema); // 'Bear' could be any name we want
// mounting BearSchema (from line 6) into 'Bear' (create an object called Bear and use Bear schema)