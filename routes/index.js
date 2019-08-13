/* Module Dependancies */
var express     = require('express');
var router      = express.Router();
var rp          = require("request-promise");
var cron        = require("node-cron");
var fs          = require("fs").promises;

/* Request Settings */
var {ScoreOptions} = require('./config.js');

/* Sentiment Data */
var data;

try { data = require("../data.json"); } 
catch (err) { data = new Object(); }

/* Update Sentiment Data */
cron.schedule('*/10 * * * * *', () => updateData());

/* GET: Home. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Finatext | Sentiment' });
});

/* GET: Home. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Finatext | Dashboard' });
});

/* GET BTC Sentiment */
router.get('/sentiment/btc', (req, res, next) => res.json(data.BTC));

/* GET ETH Sentiment */
router.get('/sentiment/eth', (req, res, next) => res.json(data.ETH));

/* GET LTC Sentiment */
router.get('/sentiment/ltc', (req, res, next) => res.json(data.LTC));

/* GET XRP Sentiment */
router.get('/sentiment/xrp', (req, res, next) => res.json(data.XRP));

/* GET EOS Sentiment */
router.get('/sentiment/eos', (req, res, next) => res.json(data.EOS));

/* GET BCH Sentiment */
router.get('/sentiment/bch', (req, res, next) => res.json(data.BCH));



/* Function to get latest sentiment data */
function updateData() {

  console.log("Updating on Server Side");

  // Get Sentiment Data via API
  rp(ScoreOptions("btc"))
  .then(res => { data.BTC = JSON.parse(res).body; return rp(ScoreOptions("eth"))})
  .then(res => { data.ETH = JSON.parse(res).body; return rp(ScoreOptions("xrp"))})
  .then(res => { data.XRP = JSON.parse(res).body; return rp(ScoreOptions("ltc"))})
  .then(res => { data.LTC = JSON.parse(res).body; return rp(ScoreOptions("eos"))})
  .then(res => { data.EOS = JSON.parse(res).body; return rp(ScoreOptions("bch"))})
  .then(res => { data.BCH = JSON.parse(res).body })

  // Write Results to data.json
  .then(res => { fs.writeFile('./data.json', JSON.stringify(data, null, 2))})

  // Re-read results from data.json
  .then(res => { data = require("../data.json") })

  // Catch any errors
  .catch(err => { console.log(err) });
  
}



module.exports = router;
