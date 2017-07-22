console.log("hey baby");

let random = require('./random.js'),
	convert = require('./convert.js'),
	postPic = require("./post.js");

Promise.all([random.getName(), random.getDog()])
.then(values => {
	let name = values[0].Name,
		pronoun = values[0].Pronoun;
	console.log(name);
	console.log(pronoun);
	convert(values[1]).then(data=>{
		postPic(data, name, pronoun)
	});
});

// random.getName().then(data=>{console.log(data.Name, data.Pronoun);});

// random.getDog().then(data=>{
// 	console.log(data);
// 	convert(data).then(data=>{postPic(data, "Mary", "She is")});
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

