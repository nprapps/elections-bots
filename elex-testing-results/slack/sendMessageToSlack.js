const { WebClient } = require("@slack/web-api");
const { getStagingLink } = require("../helpers/getStagingLink");
require("dotenv").config();

const channelID = "C047GGNN7PT";
const web = new WebClient(process.env.SLACK_TOKEN);

async function sendMessageToSlack(data, type) {
  let scheduledText = `Today's upcoming ${data.length ? "tests" : "test"}: \n`;
  let intervalMessage =
    "Make sure to set `updateRun` to `TRUE` in the <https://docs.google.com/spreadsheets/d/1O9eh7yU5eaK55R4KROdiF_B_I42urTIQllwVOtrhO0M/edit#gid=0|config sheet> for the state. \n \n";

  const stagingLinks = await getStagingLink(data);

  data.map((text) => {
    scheduledText += `- *${text[2]}* - ${text[1]} ${text[3] ? text[3] : ""} \n`;
  });

  data.map((text, index) => {
    intervalMessage += `        *${index + 1}.* AP: ${text[2]} ${
      text[2] === "Election Day" ? "" : "begins now"
    } - ${text[1]} ${text[3] ? text[3] : ""} \n`;
  });

  try {
    await web.chat.postMessage({
      channel: channelID,
      unfurl_links: false,
      unfurl_media: false,
      text:
        type === "scheduleMessage"
          ? scheduledText
          : intervalMessage + stagingLinks,
    });

    console.log("Message has been posted");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendMessageToSlack,
};
