var express = require('express');
var router = express.Router();
var request = require("request");
var cron = require("node-cron");

var {AuthOptions, SentimentOptions} = require('./config.js');
var token;

// Get Token
updateToken();

// Update Token Every 30 minutes.
cron.schedule('0 0,30 * * * *', () => updateToken());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Finatext | Sentiment' });
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


function updateToken() {

  request(AuthOptions, (err, res, body) => token = body.AuthenticationResult.IdToken);

}

module.exports = router;
