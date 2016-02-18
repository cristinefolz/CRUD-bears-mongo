// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
	name: String,
	age: Number,
	gender: String,
});

module.exports = mongoose.model('Bear', BearSchema); // 'Bear' could be any name we want
// mounting BearSchema (from line 6) into 'Bear' (create an object called Bear and use Bear schema)