var express = require('express');
var router = express.Router();
var request = require("request");

var {AuthOptions, SentimentOptions} = require('./config.js');
var token;

// Get Token
request(AuthOptions, (err, res, body) => token = body.AuthenticationResult.IdToken);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET BTC Sentiment */
router.get('/sentiment/btc', function(req, res, next) {

    var sentimentReq = SentimentOptions(token);

    request(sentimentReq, (err, sentRes, sentimentData) => {

      var response = JSON.parse(JSON.parse(sentimentData).body);
      response.current_position.latestSentiment = parseFloat(response.current_position.latestSentiment.toFixed(4));
      res.json(response.current_position);
      
    });

});

module.exports = router;
