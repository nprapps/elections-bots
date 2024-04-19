const { WebClient } = require("@slack/web-api");
require("dotenv").config();

//* ID of the channel you want to send the message to
//! Change this to the main elex channel when ready
const channelId = "C06TYKYGGM9";
const web = new WebClient(process.env.SLACK_TOKEN);

async function sendMessageToSlack(data) {
  // const testDate = data[0];
  // const electionEvents = data[1];
  // const activity = data[2];
  // const testTimeET = data[3];

  // const message = `AP: ${activity} - ${electionEvents} ${testTimeET ? testTimeET : ""}`

  try {
    await web.chat.postMessage({
      channel: channelId,
      //! TODO: replace with data from API
      text: "message coming from github actions",
    });

    console.log("Message has been posted");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendMessageToSlack,
};
