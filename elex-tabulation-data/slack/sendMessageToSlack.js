const { WebClient } = require("@slack/web-api");
require("dotenv").config();

const channelID = "C06TYKYGGM9";
const web = new WebClient(process.env.SLACK_TOKEN);

async function sendMessageToSlack(data) {
  let message = "Tabulation status for following races have changed: \n";
  data.map((text) => {
    message += `- ${text.officeID} - ${text.stateName}: *${text.tabulationStatus}*  \n`;
  });

  try {
    await web.chat.postMessage({
      channel: channelID,
      unfurl_links: false,
      unfurl_media: false,
      text: message,
    });

    console.log("Message has been posted");
  } catch (error) {
    console.error(error);
  }
}

// sendMessageToSlack([
//   {
//     uniqueID: "41902-41",
//     electionDate: undefined,
//     officeID: "H",
//     stateID: "41",
//     seatName: "",
//     seatNum: "",
//     stateName: undefined,
//     raceID: "41902",
//     tabulationStatus: "Active Tabulation",
//     raceCallStatus: "Too Early to Call",
//   },
// ]);

module.exports = {
  sendMessageToSlack,
};
