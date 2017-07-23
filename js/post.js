"use strict";

let Twit = require('../lib/node_modules/twit'),
	config = require("./config.js"),
	T = new Twit(config);

let postPic = (dogPic, name/*, gender*/, sentence, rating) => {
	// first we must post the media to Twitter
	T.post('media/upload', { media_data: dogPic }, function (err, data, response) {
	  // now we can assign alt text to the media, for use by screen readers and
	  // other text-based presentations and interpreters
	  var mediaIdStr = data.media_id_string;
	  var altText = "i can has dog.";
	  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

	  T.post('media/metadata/create', meta_params, function (err, data, response) {
	    if (!err) {
	      // now we can reference the media and post a tweet (media will attach to the tweet)
	      var params = { status: `This is ${name}. ${sentence}. {rating} would pet again.`, media_ids: [mediaIdStr] };

	      T.post('statuses/update', params, function (err, data, response) {
	        console.log("Posted!");
	      });
	    } else {
	    	console.log("something went wrong");
	    }
	  });
	});
};

module.exports = postPic;