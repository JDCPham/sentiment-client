/* Returns token for Malcolm */
var MalcolmAuthenticationOptions = {

    method          :   `POST`,
    url             :   `https://cognito-idp.us-east-2.amazonaws.com/`,
    headers         :   {
        'Content-Type'      :   'application/x-amz-json-1.1',
        'X-Amz-Target'      :   'AWSCognitoIdentityProviderService.InitiateAuth'
    },

    json            :   true,
    body            :   {

        "AuthParameters" : {
            "USERNAME"      :   "james.li+awsCognitoTest@finatext.com",
            "PASSWORD"      :   "Perm123!"
        },

        "AuthFlow"      :   "USER_PASSWORD_AUTH",
        "ClientId"      :   "45h4lmvcf84qk7olnd8ev8th57",
        "UserPoolId"    :   "us-east-2_vJcxD38wb"
    }

}

/* Returns data from Malcolm */
function MalcolmDataOptions(token) {

    return {
        method          :   `GET`,
        url             :   `https://nc0sstu5vj.execute-api.us-east-2.amazonaws.com/prod/ssitradestrat/`,
        headers         :   {

            'Authorization' : token

        }

    };


}

module.exports = {

    AuthOptions: MalcolmAuthenticationOptions,
    SentimentOptions: MalcolmDataOptions

}



