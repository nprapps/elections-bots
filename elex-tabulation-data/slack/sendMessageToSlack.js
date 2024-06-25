const { WebClient } = require("@slack/web-api");
require("dotenv").config();

/**
 * 
 * @param {[{}]} data 
//   [{
//   uniqueID: '6243-6',
//   electionDate: '2024-06-25',
//   officeID: 'H',
//   officeName: 'U.S. House',
//   stateID: '6',
//   seatName: 'District 4',
//   seatNum: '4',
//   stateName: 'Colorado',
//   raceID: '6243',
//   raceType: 'Primary',
//   tabulationStatus: 'Awaiting Poll Close',
//   raceCallStatus: 'Too Early to Call'
// }];
 */

async function sendMessageToSlack(data) {
  const channelID = "C06TYKYGGM9";
  const web = new WebClient(process.env.SLACK_TOKEN);

  let message = "Tabulation status for following races have changed: \n";
  data.map((text) => {
    message += `- ${text.stateName}'s ${text.officeName} race for ${text.seatName}: Tabulation Status is *${text.tabulationStatus}* and Race Call status is *${text.raceCallStatus}*  \n`;
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

module.exports = {
  sendMessageToSlack,
};
