var { google } = require("googleapis");
const config = require("./google_creds.js");

var clientID = process.env.GOOGLE_OAUTH_CLIENT_ID;
var secret = process.env.GOOGLE_OAUTH_CONSUMER_SECRET;

var getClient = function () {
  const auth = new google.auth.OAuth2(
    clientID,
    secret,
    "http://localhost:8000/authenticate/"
  );
  let tokens = {};

  try {
    tokens = JSON.parse(JSON.stringify(config.config));
    auth.setCredentials(tokens);
  } catch (err) {
    console.log({ err });
    console.log("Unable to load existing tokens");
  }

  return auth;
};

module.exports = { getClient };
