"use strict";

let Twit = require('../lib/node_modules/twit'),
	config = require("./config.js"),
	T = new Twit(config);

let getTweets = () => {
	let tweetsArray = [],
		sentenceArray = [],
		ratingArray=[];
	return new Promise((resolve, reject) => {

		// Getting we rate dogs tweets
		T.get('statuses/user_timeline', {screen_name: "dog_rates", count: 30, include_rts: false, exclude_replies: true}, (err, data, response) => {
			if (err){
				console.log(err);
			}else{
				// console.log(data);
				data.forEach(thing => {
					// console.log(thing.text);
					let tweet = thing.text,
							tempSentArray = [],
							tempRatingArray = [];
					let tempArray = tweet.split(" ");
					if (tempArray[0] === "This" && tempArray[1] === "is"){
						tempArray.splice(0, 3);
						let filterArray4Sentences = (string) => {
							if (!string.includes("http") && !string.includes("/10"))
							{
								return string;
							}
						};
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
				let randomSentNo = Math.floor(Math.random()*(tweetsArray.length + 1)),
						randomRateNo = Math.floor(Math.random()*(tweetsArray.length + 1));
				console.log(tweetsArray[randomSentNo]);
				console.log(ratingArray[randomRateNo]);
				resolve(tweetsArray[randomSentNo], ratingArray[randomRateNo]);
			}
		});
	});
};

getTweets();
// module.exports = getTweets;
// Getting we rate dogs tweets
