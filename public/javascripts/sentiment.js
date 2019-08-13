function category(score) {
    if (score >= -1 && score < -0.6) return "Strongly Negative";
    else if (score >= -0.6 && score < -0.2) return "Negative";
    else if (score >= -0.2 && score < 0.2) return "Neutral";
    else if (score >= 0.2 && score < 0.6) return "Positive";
    else return "Strongly Positive";
 }

 function colour(score) {
    if (score >= -1 && score < -0.6) return "#e32d2d";
    else if (score >= -0.6 && score < -0.2) return "#e3702d";
    else if (score >= -0.2 && score < 0.2) return "#edea53";
    else if (score >= 0.2 && score < 0.6) return "#87c949";
    else return "#28992b";
 }

 function icon(currency) {
    if (currency == "btc") return "images/btc.svg";
    else if (currency == "eth") return "images/eth.svg";
    else if (currency == "xrp") return "images/xrp.svg";
    else if (currency == "ltc") return "images/ltc.svg";
    else if (currency == "bch") return "images/bch.svg";
    else return "images/eos.svg";
 }
 
 function timeAgo(time) {
     return moment(time).fromNow();
 }