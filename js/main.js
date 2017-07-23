"use strict";

console.log("hey baby");

let random = require('./random.js'),
	convert = require('./convert.js'),
	postPic = require("./post.js"),
	getTweets = require("./getTweets.js");

let endingArray = ["he's a good boy, Brent", "would pet again", "would snuggle again", "floofy poofy toofy", "boop that snoot", "definitely not a cat", "snuffly wuffly boop de boop"],
	randomEndingNo = Math.floor(Math.random()*(endingArray.length+1)),
	ending = endingArray[randomEndingNo];


let runBot = () =>{
	Promise.all([random.getName(), random.getDog(), getTweets()])
	.then(values => {
		let name = values[0].Name,
			pronoun = values[0].Pronoun,
			sentence = values[2][0],
			rating = values[2][1];
		console.log("mainjs sentence", sentence);
		console.log("mainjs rating", rating);
		console.log(name);
		console.log(pronoun);
		convert(values[1]).then(dogPic=>{
			postPic(dogPic, name, sentence, rating, ending);
		});
	});
};

// runBot();

let every12Hours = setInterval(runBot, 1000*60*60*12);