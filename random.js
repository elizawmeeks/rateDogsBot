const jsdom = require("jsdom");
const dom = new jsdom.JSDOM(`<!DOCTYPE html>`);
var $ = require("jquery")(dom.window);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Getting random name from random user generator.
let getName = () => {
	return new Promise((resolve, reject) => {
		$.ajax({
		  url: 'https://randomuser.me/api/',
		  dataType: 'json',
		  success: function(data) {
		    var name = capitalizeFirstLetter(data.results[0].name.first);
				// console.log(data.results[0].gender);
			var gender = data.results[0].gender;
			var pronoun;
			switch (gender){
				case "male":
					pronoun = "He is";
					break;
				case "female":
					pronoun = "She is";
					break;
				default:
					pronoun: "They are";
					break;
			}
			resolve ({Name: name, Pronoun: pronoun});
		  }
		});
	})
};

// Getting images from dog api
let getDog = () => {
	return new Promise((resolve, reject) => {
		$.ajax({
		    url:"https://dog.ceo/api/breeds/image/random"
		}).done(data => {
			resolve(data.message);
		});	
	})
};

module.exports = {getName, getDog};