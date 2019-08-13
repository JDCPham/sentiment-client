/* Current Data */
var raw;
var sentimentCategory = "Positive";
var time;
var currency = "btc";
var colour = "#444";
var icon;
var callback;

/* Currency Data */
var btcRaw = getBTCSentiment();
var ethRaw = getETHSentiment();
var xrpRaw = getXRPSentiment();
var ltcRaw = getLTCSentiment();
var bchRaw = getBCHSentiment();
var eosRaw = getEOSSentiment();

/* Elements */
var iconElement            =  $("#currency > img");
var categoryElement        =  $("#sentimentCategory > p");
var fadeElements           =  $("#currency > img, #sentimentCategory > p, #rawSentiment > p, #meta > p");
var indicatorElement       =  $("#indicator");
var sentimentScoreElement  =  $("#rawSentiment > p");
var timeElement            =  $("#meta > p");

/* Document Ready */
$(document).ready(function() {

   zingchart.render({ 
      id : 'sentimentGraph', 
      data : options,
      height: 350
   });

   setInterval(function() {
      indicatorElement.fadeOut(1000);
      indicatorElement.fadeIn(300);
   }, 1300);

   setInterval(function() {
      btcRaw = getBTCSentiment();
      ethRaw = getETHSentiment();
      xrpRaw = getXRPSentiment();
      ltcRaw = getLTCSentiment();
      bchRaw = getBCHSentiment();
      eosRaw = getEOSSentiment();
   }, 60000)

   /* Click Event Handlers */
   $('.btc').click(function() {
      raw = btcRaw;
      currency = "btc";
      updateData(raw.sentiment, currency, raw.date);
      updateGraphics(callback);
   });

   $('.eth').click(function() {
      raw = ethRaw;
      currency = "eth";
      updateData(raw.sentiment, currency, raw.date);
      updateGraphics(callback);
   });

   $('.xrp').click(function() {
      raw = xrpRaw;
      currency = "xrp";
      updateData(raw.sentiment, currency, raw.date);
      updateGraphics(callback);
   });

   $('.ltc').click(function() {
      raw = ltcRaw;
      currency = "ltc";
      updateData(raw.sentiment, currency, raw.date);
      updateGraphics(callback);
   });

   $('.bch').click(function() {
      raw = bchRaw;
      currency = "bch";
      updateData(raw.sentiment, currency, raw.date);
      updateGraphics(callback);
   });

   $('.eos').click(function() {
      raw = eosRaw;
      currency = "eos";
      updateData(raw.sentiment, currency, raw.date);
      updateGraphics(callback);
   });

});


function updateData(raw, currency, date) {
   setCategory(raw);
   setColour(raw);
   setIcon(currency);
   setTime(date);
}

function updateGraphics(cb) {
   fadeElements.fadeOut(200, function() {
      updateIcon();
      updateCategory();
      updateSentiment();
      updateTime();
      fadeElements.fadeIn(200);
   });
   updateGraph(cb);
}


/* Data update */
function setCategory(raw) {
   if (raw >= -1 && raw < -0.6) sentimentCategory = "Strongly Negative";
   else if (raw >= -0.6 && raw < -0.2) sentimentCategory = "Negative";
   else if (raw >= -0.2 && raw < 0.2) sentimentCategory = "Neutral";
   else if (raw >= 0.2 && raw < 0.6) sentimentCategory = "Positive";
   else sentimentCategory = "Strongly Positive";
}

function setColour(raw) {
   if (raw >= -1 && raw < -0.6) colour = "#e32d2d";
   else if (raw >= -0.6 && raw < -0.2) colour = "#e3702d";
   else if (raw >= -0.2 && raw < 0.2) colour = "#edea53";
   else if (raw >= 0.2 && raw < 0.6) colour = "#87c949";
   else colour = "#28992b";
}

function setIcon(currency) {
   if (currency == "btc") icon = "images/btc.svg";
   else if (currency == "eth") icon = "images/eth.svg";
   else if (currency == "xrp") icon = "images/xrp.svg";
   else if (currency == "ltc") icon = "images/ltc.svg";
   else if (currency == "bch") icon = "images/bch.svg";
   else icon = "images/eos.svg";
}

function setTime(date) {
   time = moment(date).fromNow();
}

function round(data) {
   return parseFloat(data).toFixed(4);
}


/* Graphics Update */
function updateIcon() { 
   iconElement.attr("src", icon);
}
function updateCategory() { 
   categoryElement.text(sentimentCategory); 
   categoryElement.css("color", colour);
   indicatorElement.css("background-color", colour);
}
function updateSentiment() { 
   sentimentScoreElement.text(round(raw.sentiment));
   sentimentScoreElement.css("color", colour);
}
function updateTime() {
   timeElement.text(`Last Updated ${time}`);
}

function updateGraph(cb) {
   var tick = {};
   tick.plot0 = raw.sentiment;
   cb(JSON.stringify(tick));
}

function update(cb) {
    callback = cb;
}

/* Sentiment Data */
function getBTCSentiment() { axios.get('/sentiment/btc').then(res => btcRaw = res.data); }
function getETHSentiment() { axios.get('/sentiment/eth').then(res => ethRaw = res.data); }
function getBCHSentiment() { axios.get('/sentiment/bch').then(res => bchRaw = res.data); }
function getEOSSentiment() { axios.get('/sentiment/eos').then(res => eosRaw = res.data); }
function getLTCSentiment() { axios.get('/sentiment/ltc').then(res => ltcRaw = res.data); }
function getXRPSentiment() { axios.get('/sentiment/xrp').then(res => xrpRaw = res.data); }



  