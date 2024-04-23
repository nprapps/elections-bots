const { WebClient } = require("@slack/web-api");
require("dotenv").config();

//! Change this to the main elex channel when ready
const channelID = "C06TYKYGGM9";
const web = new WebClient(process.env.SLACK_TOKEN);

async function sendMessageToSlack(data) {
  let scheduledText = `Today's upcoming tests: \n`;

  //! if there is no data for the day, don't send a message
  data.map((text) => {
    scheduledText += `- *${text[2]}* - ${text[1]} ${text[3] ? text[3] : ""} \n`;
  });

  try {
    await web.chat.postMessage({
      channel: channelID,
      text: scheduledText,
    });

    console.log("Message has been posted");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendMessageToSlack,
};
