"use strict";

console.log("hey baby");

let random = require('./random.js'),
	convert = require('./convert.js'),
	postPic = require("./post.js"),
	getTweets = require("./getTweets.js");

// Random endings I wrote real quick.
let endingArray = ["he's a good boy, Brent", "would pet again", "would snuggle again", "floofy poofy toofy", "boop that snoot", "definitely not a cat", "snuffly wuffly boop de boop"],
	randomEndingNo = Math.floor(Math.random()*(endingArray.length+1)),
	ending = endingArray[randomEndingNo];

// Actually runs the bot.
let runBot = () =>{
	Promise.all([random.getName(), random.getDog(), getTweets()])
	.then(values => {
		// Stores name, pronoun (which isn't being used right now), sentence and rating from the promises into local vairables.
		let name = values[0].Name,
			pronoun = values[0].Pronoun,
			sentence = values[2][0],
			rating = values[2][1];
		// These console logs gives an idea of what tweet is going to load in the console
		console.log("mainjs sentence", sentence);
		console.log("mainjs rating", rating);
		console.log(name);
		console.log(pronoun);
		// Converts the url into base 64
		convert(values[1]).then(dogPic=>{
			// Takes all the pieces and posts it to twitter.
			postPic(dogPic, name, sentence, rating, ending);
		});
	});
};

// runBot();

let every12Hours = setInterval(runBot, 1000*60*60*12);