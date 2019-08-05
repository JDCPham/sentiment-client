var sentimentRaw = 0.343;
var sentimentCategory = "Positive";
var callback;
var currency;

$(document).ready(function() {

    $('#sentimentCategory > p').text(sentimentCategory);

    $('.btc').click(function() {
        sentimentRaw = 0.2;
        currency = "btc";
        updateCustom(callback);
    });

    $('.eth').click(function() {
        sentimentRaw = 1;
        currency = "eth";
        updateCustom(callback);
    });

    $('.xrp').click(function() {
        sentimentRaw = -0.3;
        currency = "xrp";
        updateCustom(callback);
    });

    $('.ltc').click(function() {
        sentimentRaw = 0;
        currency = "ltc";
        updateCustom(callback);
    });

    $('.bch').click(function() {
        sentimentRaw = -0.25;
        currency = "bch";
        updateCustom(callback);
    });

    $('.eos').click(function() {
        sentimentRaw = -0.7;
        currency = "eos";
        updateCustom(callback);
    });

});

function updateSentimentCategory() {

    let raw = sentimentRaw;

    if (raw >= -1 && raw < -0.6) sentimentCategory = "Strongly Negative";
    else if (raw >= -0.6 && raw < -0.2) sentimentCategory = "Negative";
    else if (raw >= -0.2 && raw < 0.2) sentimentCategory = "Neutral";
    else if (raw >= 0.2 && raw < 0.6) sentimentCategory = "Positive";
    else sentimentCategory = "Strongly Positive";

}

function updateSentimentCategoryColour() {


    let raw = sentimentRaw;
    let colour = "#444";

    if (raw >= -1 && raw < -0.6) colour = "#e32d2d";
    else if (raw >= -0.6 && raw < -0.2) colour = "#e3702d";
    else if (raw >= -0.2 && raw < 0.2) colour = "#edea53";
    else if (raw >= 0.2 && raw < 0.6) colour = "#87c949";
    else colour = "#28992b";

    $("#sentimentCategory > p").css("color", colour);

    $("#sentimentCategory > p").fadeIn(100);


}

function updateIcon() {

    if (currency == "btc") $("#currency > img").attr("src", "images/btc.svg");
    else if (currency == "eth") $("#currency > img").attr("src", "images/eth.svg");
    else if (currency == "xrp") $("#currency > img").attr("src", "images/xrp.svg");
    else if (currency == "ltc") $("#currency > img").attr("src", "images/ltc.svg");
    else if (currency == "bch") $("#currency > img").attr("src", "images/bch.svg");
    else $("#currency > img").attr("src", "images/eth.svg");
}

function updateCustom(cb) {
    var tick = {};

    $("#sentimentCategory > p, #currency > img").fadeOut(200, function() {

        updateSentimentCategory();
        updateSentimentCategoryColour();
        updateIcon();
        $("#sentimentCategory > p").text(sentimentCategory);
        $("#sentimentCategory > p, #currency > img").fadeIn(100);
        
    });


    tick.plot0 = sentimentRaw;
    cb(JSON.stringify(tick));
}

function update(cb) {
    callback = cb;
    var tick = {};
    tick.plot0 = sentimentRaw;
    cb(JSON.stringify(tick));
    $("#sentimentCategory > p").text(sentimentCategory);
}


var myConfig = {
    type:"gauge",
    globals:{
       fontSize:14
    },
    plotarea:{
       marginTop:80
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
          size:25,
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
        interval: 2000
    },
    series:[
       {
          values:[
            sentimentRaw
          ],
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
    data : myConfig,
    height: 450
});



  