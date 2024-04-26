const { WebClient } = require("@slack/web-api");
require("dotenv").config();

//! Change this to the main elex channel when ready
const channelID = "C06TYKYGGM9";
const web = new WebClient(process.env.SLACK_TOKEN);

async function sendMessageToSlack(data, type) {
  let scheduledText = `Today's upcoming ${data.length ? "tests" : "test"}: \n`;
  let intervalMessage = "";

  data.map((text) => {
    scheduledText += `- *${text[2]}* - ${text[1]} ${text[3] ? text[3] : ""} \n`;
  });

  data.map((text) => {
    intervalMessage += `AP: ${text[2]} ${
      text[2] === "Election Day" ? "" : "begins now"
    } - ${text[1]} ${text[3] ? text[3] : ""} \n`;
  });

  try {
    await web.chat.postMessage({
      channel: channelID,
      text: type === "scheduleMessage" ? scheduledText : intervalMessage,
    });

    console.log("Message has been posted");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendMessageToSlack,
};
