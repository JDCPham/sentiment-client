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
 
 function timeAgo(time) {
     return moment(time).fromNow();
 }