const { sendMessageToSlack } = require("./sendMessageToSlack");

function slackMessage(messages) {
  let calledRaceMsg = ":white_check_mark: *Recently called:* \n";
  let activeTabulationMsg = "*Now in active tabulation:* \n";
  let tooClosetooCallMsg = "*Too close to call, per AP:* \n";
  let UnableToCallMsg = "*AP is unable to call:* \n";
  let rankedChoiceMsg = "*Awaiting ranked choice results:* \n";
  let runoffMsg = "*Going to a runoff:* \n";

  Object.keys(messages).map((message) => {
    if (Array.isArray(messages[message])) {
      messages[message].map(
        (calledRace) => (calledRaceMsg += `${calledRace} \n`)
      );
    } else {
      if (message === "Now in active tabulation") {
        Object.keys(messages[message]).map((activeTabulation) => {
          activeTabulationMsg += `${activeTabulation}: ${messages[message][
            activeTabulation
          ].join(", ")} \n`;
        });
      }

      if (message === "Too Close to Call") {
        Object.keys(messages[message]).map((tooClosetooCall) => {
          tooClosetooCallMsg += `${tooClosetooCall}: ${messages[message][
            tooClosetooCall
          ].join(", ")} \n`;
        });
      }

      if (message === "Unable to Call") {
        Object.keys(messages[message]).map((UnableToCall) => {
          UnableToCallMsg += `${UnableToCall}: ${messages[message][
            UnableToCall
          ].join(", ")} \n`;
        });
      }

      if (message === "Awaiting Ranked Choice Results") {
        Object.keys(messages[message]).map((rankedChoice) => {
          rankedChoiceMsg += `${rankedChoice}: ${messages[message][
            rankedChoice
          ].join(", ")} \n`;
        });
      }

      if (message === "Runoff") {
        Object.keys(messages[message]).map((runoff) => {
          runoffMsg += `${runoff}: ${messages[message][runoff].join(", ")} \n`;
        });
      }
    }
  });

  const slackMsg =
    calledRaceMsg +
    "\n" +
    activeTabulationMsg +
    "\n" +
    tooClosetooCallMsg +
    "\n" +
    UnableToCallMsg +
    "\n" +
    rankedChoiceMsg +
    "\n" +
    runoffMsg;

  sendMessageToSlack(slackMsg);
}

module.exports = {
  slackMessage,
};
