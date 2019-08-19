/* Elements */
var SentimentElement    = $("#card > .sentiment");
var CategoryElement     = $("#card > .category");
var UpdatedElement      = $("#card > .updated");


/* Document Ready */
$(document).ready(function() {

   var currency = $("#card > img").attr("data-curr");

   getData(currency, SentimentElement, CategoryElement, UpdatedElement);
  
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


  