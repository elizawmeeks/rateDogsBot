"use strict";

var request = require('../lib/node_modules/request').defaults({ encoding: null });

let to64 = (pic) => {
  return new Promise((resolve, reject) => {
    var dogPic;
    request.get(pic, function (error, response, body) {
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