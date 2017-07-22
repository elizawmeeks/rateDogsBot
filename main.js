console.log("hey baby");

var Twit = require('twit');
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM(`<!DOCTYPE html>`);
var $ = require("jquery")(dom.window);
var fs = require("fs");
var config = require("./config.js");
var T = new Twit(config);

// T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//   console.log(data)
// });

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Getting random name from random user generator.
// $.ajax({
//   url: 'https://randomuser.me/api/',
//   dataType: 'json',
//   success: function(data) {
//     console.log(capitalizeFirstLetter(data.results[0].name.first));
//   }
// });

// Getting we rate dogs tweets
// T.get('statuses/user_timeline', {screen_name: "dog_rates", count: 30, include_rts: false, exclude_replies: true}, (err, data, response) => {
// 	if (err){
// 		console.log(err);
// 	}else{
// 		// console.log(data);
// 		data.forEach(thing => {
// 			console.log(thing.text);
// 		});
// 	}
// });

// Getting images from dog api
// $.ajax({
//     url:"https://dog.ceo/api/breeds/image/random"
// }).done(data => {
// 	console.log(data.message);
// });

// var b64content = fs.readFileSync('https://dog.ceo/api/img/terrier-norfolk/n02094114_2739.jpg', { encoding: 'base64' })

var request = require('request').defaults({ encoding: null });

let myFirstPromise = new Promise((resolve, reject) => {
  var dogPic;
  request.get('https://dog.ceo/api/img/terrier-norfolk/n02094114_2739.jpg', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        dogPic = new Buffer(body).toString('base64');
        // console.log(data);
		resolve(dogPic);
    }else{
		reject(error);
	}
});
});

myFirstPromise.then(resolve => {
	postPic(resolve);
})
.catch(reject => {
	console.log(reject, "error");
});

let postPic = (dogPic) => {
	// first we must post the media to Twitter
	T.post('media/upload', { media_data: dogPic }, function (err, data, response) {
	  // now we can assign alt text to the media, for use by screen readers and
	  // other text-based presentations and interpreters
	  var mediaIdStr = data.media_id_string
	  var altText = "i can has dog."
	  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

	  T.post('media/metadata/create', meta_params, function (err, data, response) {
	    if (!err) {
	      // now we can reference the media and post a tweet (media will attach to the tweet)
	      var params = { status: 'test dog pic', media_ids: [mediaIdStr] }

	      T.post('statuses/update', params, function (err, data, response) {
	        console.log(data)
	      })
	    } else {
	    	console.log("posted?");
	    }
	  })
	})
};