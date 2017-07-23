"use strict";

console.log("hey baby");

let random = require('./random.js'),
	convert = require('./convert.js'),
	postPic = require("./post.js"),
	getTweets = require("./getTweets.js");

Promise.all([random.getName(), random.getDog(), getTweets()])
.then(values => {
	let name = values[0].Name,
		pronoun = values[0].Pronoun,
		sentence = values[2][0],
		rating = values[2][1];
	console.log(name);
	console.log(pronoun);
	convert(values[1]).then(data=>{
		postPic(data, name, sentence, rating);
	});
});