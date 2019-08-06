/* Current Data */
var sentimentRaw = 0.343;
var sentimentCategory = "Positive";
var currency = "btc";
var colour = "#444";
var icon;
var callback;

/* Currency Data */
var btcRaw = getBTCSentiment();
var ethRaw;
var xrpRaw;
var ltcRaw;
var bchRaw;
var eosRaw;

/* Elements */
var iconElement = $("#currency > img");
var categoryElement = $("#sentimentCategory > p");
var fadeElements = $("#currency > img, #sentimentCategory > p, #indicator, #rawSentiment > p");
var indicatorElement = $("#indicator");
var sentimentScoreElement = $("#rawSentiment > p");

/* Document Ready */
$(document).ready(function() {

   setInterval(function() {
      indicatorElement.fadeOut(1000);
      indicatorElement.fadeIn(300);
   }, 1300);

   /* Click Event Handlers */
   $('.btc').click(function() {
      sentimentRaw = btcRaw;
      currency = "btc";
      updateData(sentimentRaw, currency);
      updateGraphics(callback);
   });

   $('.eth').click(function() {
      sentimentRaw = 1;
      currency = "eth";
      updateData(sentimentRaw, currency);
      updateGraphics(callback);
   });

   $('.xrp').click(function() {
      sentimentRaw = -0.3;
      currency = "xrp";
      updateData(sentimentRaw, currency);
      updateGraphics(callback);
   });

   $('.ltc').click(function() {
      sentimentRaw = 0;
      currency = "ltc";
      updateData(sentimentRaw, currency);
      updateGraphics(callback);
   });

   $('.bch').click(function() {
      sentimentRaw = -0.2553;
      currency = "bch";
      updateData(sentimentRaw, currency);
      updateGraphics(callback);
   });

   $('.eos').click(function() {
      sentimentRaw = -0.7;
      currency = "eos";
      updateData(sentimentRaw, currency);
      updateGraphics(callback);
   });

});


function updateData(raw, currency) {
   setCategory(raw);
   setColour(raw);
   setIcon(currency);
}

function updateGraphics(cb) {
   fadeElements.fadeOut(200, function() {
      updateIcon();
      updateCategory();
      updateSentiment();
      fadeElements.fadeIn(200);
   });
   updateGraph(cb);
}

var options = {
   type:"gauge",
   globals:{
      fontSize:10
   },
   plotarea:{
      marginTop:40
   },
   plot:{
      size:'100%',

   },
   tooltip:{
      borderRadius:0
   },
   scaleR:{
      aperture:180,
      minValue:-1,
      maxValue:1,
      step:0.1,
      center:{
         visible:false
      },
      tick:{
         visible:false
      },
      item:{
         offsetR:0,
         angle:"auto"
      },
      labels:[
         '-1'
      ],
      ring:{
         size:15,
         rules:[
            {
               rule:'%v >= -1 && %v < -0.6',
               backgroundColor:'#e32d2d'
            },
            {
               rule:'%v >= -0.6 && %v < -0.2',
               backgroundColor:'#e3702d'
            },
            {
               rule:'%v >= -0.2 && %v < 0.2',
               backgroundColor:'#edea53'
            },
            {
               rule:'%v >= 0.2 && %v < 0.6',
               backgroundColor:'#87c949'
            },
            {
               rule:'%v >= 0.6 && %v < 1.0',
               backgroundColor:'#28992b'
            }
         ]
      }
   },
   refresh:{  
       type:"feed",
       transport:"js",
       url:"update()",
       interval: 1000
   },
   series:[
      {
         values:[],
         backgroundColor:'black',
         csize:"8%",
         size:"100%",
         animation:{
            effect:2,
            method:5,
            sequence:2,
            speed:4000
         },

      }
   ]
};
  
zingchart.render({ 
    id : 'sentimentGraph', 
    data : options,
    height: 350
});

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
   sentimentScoreElement.text(sentimentRaw);
   sentimentScoreElement.css("color", colour);
}
function updateGraph(cb) {
   var tick = {};
   tick.plot0 = sentimentRaw;
   cb(JSON.stringify(tick));
}

function update(cb) {
    callback = cb;
}

/* Sentiment Data */
function getBTCSentiment() {
   axios.get('/sentiment/btc')
   .then(res => btcRaw = res.data.latestSentiment);
}



  