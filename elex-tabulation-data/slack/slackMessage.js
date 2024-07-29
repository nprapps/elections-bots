function slackMessage(messages) {
  let calledRaceMsg = "";
  let activeTabulationMsg = "";
  let tooClosetooCallMsg = "";
  let UnableToCallMsg = "";
  let rankedChoiceMsg = "";
  let runoffMsg = "";

  Object.keys(messages).map((message) => {
    if (Array.isArray(messages[message])) {
      messages[message].map(
        (calledRace) => (calledRaceMsg += `${calledRace} \n`)
      );
    } else {
      if (message === "Now in active tabulation") {
        Object.keys(messages[message]).map((activeTabulation) => {
          activeTabulationMsg += messages[message][activeTabulation].length
            ? `${activeTabulation}: ${messages[message][activeTabulation].join(
                ", "
              )} \n`
            : "";
        });
      }

      if (message === "Too Close to Call") {
        Object.keys(messages[message]).map((tooClosetooCall) => {
          tooClosetooCallMsg += messages[message][tooClosetooCall].length
            ? `${tooClosetooCall}: ${messages[message][tooClosetooCall].join(
                ", "
              )} \n`
            : "";
        });
      }

      if (message === "Unable to Call") {
        Object.keys(messages[message]).map((UnableToCall) => {
          UnableToCallMsg += messages[message][UnableToCall].length
            ? `${UnableToCall}: ${messages[message][UnableToCall].join(
                ", "
              )} \n`
            : "";
        });
      }

      if (message === "Awaiting Ranked Choice Results") {
        Object.keys(messages[message]).map((rankedChoice) => {
          rankedChoiceMsg += messages[message][rankedChoice].length
            ? `${rankedChoice}: ${messages[message][rankedChoice].join(
                ", "
              )} \n`
            : "";
        });
      }

      if (message === "Runoff") {
        Object.keys(messages[message]).map((runoff) => {
          runoffMsg += messages[message][runoff].length
            ? `${runoff}: ${messages[message][runoff].join(", ")} \n`
            : "";
        });
      }
    }
  });

  const slackMsg =
    `${
      calledRaceMsg
        ? ":white_check_mark: *Recently called:* \n" + calledRaceMsg + "\n"
        : ""
    }` +
    `${
      activeTabulationMsg
        ? "*Now in active tabulation:* \n" + activeTabulationMsg + "\n"
        : ""
    }` +
    `${
      tooClosetooCallMsg
        ? "*Too close to call, per AP:* \n" + tooClosetooCallMsg + "\n"
        : ""
    }` +
    `${
      UnableToCallMsg
        ? "*AP is unable to call:* \n" + UnableToCallMsg + "\n"
        : ""
    }` +
    `${
      rankedChoiceMsg
        ? "*:rotating_light: Awaiting ranked choice results:* \n" +
          rankedChoiceMsg +
          "\n"
        : ""
    }` +
    `${runoffMsg ? "*Going to a runoff:* \n" + runoffMsg : ""}`;
}

module.exports = {
  slackMessage,
};
