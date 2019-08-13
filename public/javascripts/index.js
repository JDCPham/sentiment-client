/* Current Data */
var raw;
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

   if ($(window).width() <= 515) {
      zingchart.render({ 
         id : 'sentimentGraph', 
         data : options,
         height: '100%'
      });
   } else {
      zingchart.render({ 
         id : 'sentimentGraph', 
         data : options,
         height: '130%'
      });
   }

   setInterval(function() {
      indicatorElement.fadeOut(1000);
      indicatorElement.fadeIn(300);
   }, 1300);

   /* Click Event Handlers */
   $('.btc').click(function() {
      raw = btcRaw;
      updateGraphics(callback);
   });

   $('.eth').click(function() {
      raw = ethRaw;
      updateGraphics(callback);
   });

   $('.xrp').click(function() {
      raw = xrpRaw;
      updateGraphics(callback);
   });

   $('.ltc').click(function() {
      raw = ltcRaw;
      updateGraphics(callback);
   });

   $('.bch').click(function() {
      raw = bchRaw;
      updateGraphics(callback);
   });

   $('.eos').click(function() {
      raw = eosRaw;
      updateGraphics(callback);
   });

});


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


/* Graphics Update */
function updateIcon() { 
   iconElement.attr("src", icon(raw.asset));
}
function updateCategory() { 
   categoryElement.text(category(raw.sentiment)); 
   categoryElement.css("color", colour(raw.sentiment));
   indicatorElement.css("background-color", colour(raw.sentiment));
}
function updateSentiment() { 
   sentimentScoreElement.text(round(raw.sentiment));
   sentimentScoreElement.css("color", colour(raw.sentiment));
}
function updateTime() {
   timeElement.text(`Last Updated ${timeAgo(raw.date)}`);
}

function updateGraph(cb) {
   var tick = {};
   tick.plot0 = raw.sentiment;
   cb(JSON.stringify(tick));
}

function update(cb) { callback = cb; }

function round(data) { return parseFloat(data).toFixed(4); }

/* Sentiment Data */
function getBTCSentiment() { axios.get('/sentiment/btc').then(res => btcRaw = res.data); }
function getETHSentiment() { axios.get('/sentiment/eth').then(res => ethRaw = res.data); }
function getBCHSentiment() { axios.get('/sentiment/bch').then(res => bchRaw = res.data); }
function getEOSSentiment() { axios.get('/sentiment/eos').then(res => eosRaw = res.data); }
function getLTCSentiment() { axios.get('/sentiment/ltc').then(res => ltcRaw = res.data); }
function getXRPSentiment() { axios.get('/sentiment/xrp').then(res => xrpRaw = res.data); }



  