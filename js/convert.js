"use strict";

var request = require('../lib/node_modules/request').defaults({ encoding: null });

// Converts the URL into base64 string so the image can be uploaded to Twitter.
let to64 = (pic) => {
  return new Promise((resolve, reject) => {
    var dogPic;
    request.get(pic, function (error, response, body) {
      // uses Node's Buffer to read binary, and then toString to convert it to base64
      if (!error && response.statusCode == 200) {
        dogPic = new Buffer(body).toString('base64');
        // console.log(data);
    resolve(dogPic);
      }else{
    reject(error);
    }
    });
  });
};

module.exports = to64;