"use strict";

const jsdom = require("../lib/node_modules/jsdom");
const dom = new jsdom.JSDOM(`<!DOCTYPE html>`);
var $ = require("../lib/node_modules/jquery")(dom.window);

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
		  	// storing name in a local variable
		    var name = capitalizeFirstLetter(data.results[0].name.first);
				// console.log(data.results[0].gender);
			var gender = data.results[0].gender;
			// Storing the gender into a pronoun. Not using this at the moment because I went a different direction.
			var pronoun;
			switch (gender){
				case "male":
					pronoun = "He is";
					break;
				case "female":
					pronoun = "She is";
					break;
				default:
					pronoun = "They are";
					break;
			}
			// Send back an object with the name and pronoun.
			resolve ({Name: name, Pronoun: pronoun});
		  }
		});
	});
};

// Getting images from dog api
let getDog = () => {
	return new Promise((resolve, reject) => {
		$.ajax({
		    url:"https://dog.ceo/api/breeds/image/random"
		}).done(data => {
			// Send back the url
			resolve(data.message);
		});	
	});
};

module.exports = {getName, getDog};