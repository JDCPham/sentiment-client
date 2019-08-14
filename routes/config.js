function ScoreOptions(currency) {

    return {
        method          :   "GET",
        url             :   "https://fywvr4qneh.execute-api.us-east-2.amazonaws.com/api/sentiment/?asset=" + currency,
        headers         :   { "x-api-key" : "JOBQ4mGwIB8w53McI0MeU3ouWTotdQ4R6ViMwFLw", 
                              "Host": "fywvr4qneh.execute-api.us-east-2.amazonaws.com" }
    }

}



module.exports = {

    ScoreOptions: ScoreOptions

}



