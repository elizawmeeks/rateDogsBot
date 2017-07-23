"use strict";

var request = require('../lib/node_modules/request').defaults({ encoding: null });

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
	console.log(resolve, "finishedPromise");
})
.catch(reject => {
	console.log(reject, "error");
});