# @rate_dogs_bot

[Twitter Bot](https://twitter.com/dog_rates_bot) built as an homage to [@dog_rates](https://twitter.com/dog_rates).

## Installation

Fork/clone, then in the lib folder run

```
npm install
```

The only grunt task I'm using is JSHint for linting (I've been using C# lately and the freewheeling in Node was getting to me). If you want to lint, run ```grunt``` from your lib folder.

To make a Twitter app, create a Twitter account, then when you're signed in go to apps.twitter.com. Create a new app (or click on the app you want to use), then on your app page click ```Keys and Access Tokens```, where you will find the necessary keys and tokens.

Create a file in the ```js``` directory called ```config.js``` . Put in your twitter keys and tokens.

```javascript
"use strict";

module.exports = {
  consumer_key:'YOUR KEY HERE',
  consumer_secret:'SECRET KEY HERE',
  access_token:'TOKEN HERE',
  access_token_secret:'SECRET TOKEN HERE'
};

```

Apparently you have to have a phone number associated with the account to create an app. I didn't want to associate my real phone number with a bot account, so I created a free phone number using [Google Voice](https://voice.google.com/).

Sometimes when you copy and paste the tokens and keys from Twitter's website, it adds random spaces at the beginning and the end. Some of the strings are so long that--especially if you use word wrap--it can be hard to see them there. Double check that there are no extra spaces or tabs at the beginning or ends of your keys and save yourself some frustration.

When you've got it down loaded, navigate into the js folder, then run ```node main.js``` to run the program.

If you have even a fraction of the fun with this (or a similar bot) as I had making this one, then you have suceeded marvelously.

### Technologies and Resources

APIs:

 * [Twitter](dev.twitter.com)
 * [Dog Ceo](https://dog.ceo/dog-api/ ) -- Generates images of dogs
 * [Random User](https://randomuser.me/ ) -- Generates a random user, I pulled names for the dogs from it.

Frameworks/Taskrunners/Etc.:

 * [Node.JS](https://nodejs.org/en/)
 * [Request](https://github.com/request/request) -- A simple way to make http calls. Most of the reason I used this was because I was blundering through trying to convert a url into a base64 string, and stack overflow offered this up using this syntax. I also learned a new way to make HTTP calls.
 * [jsdom](https://github.com/tmpvar/jsdom) -- Since jquery requires a dom and I was only using Node, I used jsdom to make a dom so I could use jquery in Node.
 * [Twit](https://github.com/ttezel/twit) -- Simplifies using the Twitter API in conjunction with Node.
 * [JQuery](https://jquery.com/) -- I used two different frameworks to make HTTP calls because...I forgot I had one installed already.
 * [Grunt](https://gruntjs.com/)

Major Props to [The Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw) for [this series of videos](https://www.youtube.com/watch?v=RF5_MPSNAtU) on making Twitter bots with Node that got me off on the right foot.
