/* Elements */
var BTCSentimentElement    = $(".btc > .sentiment");
var ETHSentimentElement    = $(".eth > .sentiment");
var XRPSentimentElement    = $(".xrp > .sentiment");
var LTCSentimentElement    = $(".ltc > .sentiment");
var EOSSentimentElement    = $(".eos > .sentiment");
var BCHSentimentElement    = $(".bch > .sentiment");

var BTCCategoryElement     = $(".btc > .category");
var ETHCategoryElement     = $(".eth > .category");
var XRPCategoryElement     = $(".xrp > .category");
var LTCCategoryElement     = $(".ltc > .category");
var EOSCategoryElement     = $(".eos > .category");
var BCHCategoryElement     = $(".bch > .category");

var BTCUpdatedElement     = $(".btc > .updated");
var ETHUpdatedElement     = $(".eth > .updated");
var XRPUpdatedElement     = $(".xrp > .updated");
var LTCUpdatedElement     = $(".ltc > .updated");
var EOSUpdatedElement     = $(".eos > .updated");
var BCHUpdatedElement     = $(".bch > .updated");

/* Document Ready */
$(document).ready(function() {

   // BTC 
   getData("btc", BTCSentimentElement, BTCCategoryElement, BTCUpdatedElement);

   // ETH 
   getData("eth", ETHSentimentElement, ETHCategoryElement, ETHUpdatedElement);

   // XRP 
   getData("xrp", XRPSentimentElement, XRPCategoryElement, XRPUpdatedElement);

   // LTC 
   getData("ltc", LTCSentimentElement, LTCCategoryElement, LTCUpdatedElement);

   // EOS 
   getData("eos", EOSSentimentElement, EOSCategoryElement, EOSUpdatedElement);

   // BCH 
   getData("bch", BCHSentimentElement, BCHCategoryElement, BCHUpdatedElement);




  
});

function getData(currency, sentimentElement, categoryElement, updatedElement) {
   axios.get(`/sentiment/${currency}`).then(res => {
      sentimentElement.text(parseFloat(res.data.sentiment).toFixed(4));
      sentimentElement.css("color", colour(res.data.sentiment));
      categoryElement.text(category(res.data.sentiment));
      categoryElement.css("color", colour(res.data.sentiment));
      updatedElement.text(`Last Updated ${timeAgo(res.data.date)}`);
   }); 
}


  