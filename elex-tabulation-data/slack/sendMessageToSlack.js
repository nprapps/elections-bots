const { WebClient } = require("@slack/web-api");
require("dotenv").config();

/**
 * 
 * @param {[{}]} data 
   [{
    uniqueID: '6243-6',
    electionDate: '2024-06-25',
    officeID: 'H',
    officeName: 'U.S. House',
    stateID: '6',
    seatName: 'District 4',
    seatNum: '4',
    stateName: 'Colorado',
    raceID: '6243',
    raceType: 'Primary',
    tabulationStatus: 'Awaiting Poll Close',
    raceCallStatus: 'Too Early to Call',
    candidates: [{
      "first": "Lauren",
      "last": "Boebert",
      "party": "GOP",
      "candidateID": "68897",
      "ballotOrder": 1,
      "polID": "68897",
      "polNum": "68897",
      "voteCount": 52041,
      "winner": "X",
      "winnerDateTime": "2024-06-26T01:22:04.103Z"}, {}]
// }];
 */

async function sendMessageToSlack(message) {
  const channelID = "C06TYKYGGM9";
  const web = new WebClient(process.env.SLACK_TOKEN);

  try {
    await web.chat.postMessage({
      channel: channelID,
      unfurl_links: false,
      unfurl_media: false,
      text: "text",
      blocks: message,
    });

    console.log("Message has been posted");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendMessageToSlack,
};
