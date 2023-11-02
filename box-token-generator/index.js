const BoxSDK = require("box-node-sdk");
require('dotenv').config()

exports.handler = async function (event) {
  //Auth code from querystring
  const authCode = event.queryStringParameters.authCode;
  //Client ID from querystring
  const clientId = event.queryStringParameters.clientId;
  //Client secret that matches the client ID
  //Read from environment variable as an example
  let secret =process.env.BOX_APP_SECRET;
  var tokens;
 
  var sdk = new BoxSDK({
    clientID: clientId,
    clientSecret: secret,
  });
  //Get the tokens from Box using the Auth code
  await sdk.getTokensAuthorizationCodeGrant(
    authCode, null, function (err, tokenInfo) {
      tokens = {
        token: tokenInfo.accessToken,
        refreshToken: tokenInfo.refreshToken
      };
    }
  );
  //Return the tokens to the caller
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify(tokens),
  };
  return response;
};