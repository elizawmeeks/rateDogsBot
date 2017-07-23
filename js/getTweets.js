"use strict";

let Twit = require('../lib/node_modules/twit'),
	config = require("./config.js"),
	T = new Twit(config);

// Uses Twit to get @rate_dogs tweets, then sorts the ones we want and sends a random sentence and rating to our bot.

let getTweets = () => {
	let tweetsArray = [],
		sentenceArray = [],
		ratingArray=[];
	return new Promise((resolve, reject) => {

		// Getting we rate dogs tweets
		T.get('statuses/user_timeline', {screen_name: "dog_rates", count: 1000, include_rts: false, exclude_replies: true}, (err, data, response) => {
			if (err){
				console.log(err);
			}else{
				// Sorts the tweets
				data.forEach(thing => {
					let tweet = thing.text,
							tempSentArray = [],
							tempRatingArray = [];
					let tempArray = tweet.split(" ");
					// Saves "this is" pattern tweets into our sentenceArray
					if (tempArray[0] === "This" && tempArray[1] === "is"){
						tempArray.splice(0, 3);
						// Gets rid of the pictures
						let filterArray4Sentences = (string) => {
							if (!string.includes("http") && !string.includes("/10"))
							{
								return string;
							}
						};
						// Filters the ratings and sends them into  ratingArray. Yes, I am using filter as an impromptu forEach loop here.
						let filterRates = (string) => {
							if (string.includes("/10")){
								ratingArray.push(string);
							}
						};
						tempSentArray = tempArray.filter(filterArray4Sentences);
						tempRatingArray = tempArray.filter(filterRates);

						tweetsArray.push(tempSentArray.join(" "));
					}
				});
				// Picks a random number for the sentences and rates.
				let randomSentNo = Math.floor(Math.random()*(tweetsArray.length + 1)),
						randomRateNo = Math.floor(Math.random()*(tweetsArray.length + 1));
				console.log(tweetsArray[randomSentNo]);
				console.log(ratingArray[randomRateNo]);
				// Puts the random sentence and rating into an array to resolve.
				let resolveArray = [tweetsArray[randomSentNo], ratingArray[randomRateNo]];
				resolve(resolveArray);
			}
		});
	});
};

// getTweets();
module.exports = getTweets;
