const { WebClient } = require("@slack/web-api");
const { getStagingLink } = require("../helpers/getStagingLink");
require("dotenv").config();

const channelID = "C047GGNN7PT";
const web = new WebClient(process.env.SLACK_TOKEN);

async function sendMessageToSlack(data, type) {
  let scheduledText = `Today's upcoming ${data.length ? "tests" : "test"}: \n`;
  let intervalMessage = "";

  console.log({ data });
  const stagingLinks = await getStagingLink(data);
  console.log({ stagingLinks });

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
