const { whoIsLeading } = require("../../helpers/whoIsLeading");
const { getMessage } = require("./getMessage");
const { getEmoji } = require("./getEmoji");

const RECENTLYCALLED = "Recently called";
const ACTIVETABULATION = "Now in active tabulation";
const TOOCLOSE = "Too close to call, per AP";
const UNABLETOCALL = "AP is unable to call";
const RANKEDCHOICE = "Awaiting ranked choice results";
const RUNOFF = "Going to a runoff";
const UNCALLED = "AP HAS UNCALLED THESE RACES";

function formatMessage(races) {
  const recentlyCalled = {};
  const activetabulation = {};
  const tooClose = {};
  const unableToCall = {};
  const rankedChoice = {};
  const runoff = {};
  const uncalled = {};

  races.map((race, i) => {
    const winner = whoIsLeading(race.candidates);
    const leadingCandidate = winner.name;
    const isLeadingCandidateTheWinner = winner.winner;

    if (isLeadingCandidateTheWinner) {
      if (race.officeID === "H") {
        if (!recentlyCalled["House"]) {
          recentlyCalled["House"] = [
            ` ${race.statePostal}${
              race.seatNum ? -race.seatNum : ""
            }  ( ${leadingCandidate} - ${winner.party})`,
          ];
        } else {
          recentlyCalled["House"].push(
            ` ${race.statePostal}${
              race.seatNum ? -race.seatNum : ""
            }  ( ${leadingCandidate} - ${winner.party})`
          );
        }
      }

      if (race.officeID === "S") {
        if (!recentlyCalled["Senate"]) {
          recentlyCalled["Senate"] = [
            ` ${race.statePostal}${
              race.seatNum ? -race.seatNum : ""
            }  ( ${leadingCandidate} - ${winner.party})`,
          ];
        } else {
          recentlyCalled["Senate"].push(
            ` ${race.statePostal}${
              race.seatNum ? -race.seatNum : ""
            }  ( ${leadingCandidate} - ${winner.party})`
          );
        }
      }

      if (race.officeID === "P") {
        if (!recentlyCalled["President"]) {
          recentlyCalled["President"] = [
            ` ${race.statePostal}${
              race.seatNum ? -race.seatNum : ""
            }  ( ${leadingCandidate} - ${winner.party})`,
          ];
        } else {
          recentlyCalled["President"].push(
            ` ${race.statePostal}${
              race.seatNum ? -race.seatNum : ""
            }  ( ${leadingCandidate} - ${winner.party})`
          );
        }
      }
    } else if (race.raceCallStatus === "Too Close to Call") {
      if (race.officeID === "H") {
        if (!tooClose["House"]) {
          tooClose["House"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          tooClose["House"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }

      if (race.officeID === "S") {
        if (!tooClose["Senate"]) {
          tooClose["Senate"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          tooClose["Senate"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""}  (${
              race.tabulationStatus
            })`
          );
        }
      }

      if (race.officeID === "P") {
        if (!tooClose["President"]) {
          tooClose["President"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""}  (${
              race.tabulationStatus
            })`,
          ];
        } else {
          tooClose["President"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
    } else if (race.raceCallStatus === "Unable to Call") {
      if (race.officeID === "H") {
        if (!unableToCall["House"]) {
          unableToCall["House"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          unableToCall["House"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
      if (race.officeID === "S") {
        if (!unableToCall["Senate"]) {
          unableToCall["Senate"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          unableToCall["Senate"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""}  (${
              race.tabulationStatus
            })`
          );
        }
      }
      if (race.officeID === "P") {
        if (!unableToCall["President"]) {
          unableToCall["President"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          unableToCall["President"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""}  (${
              race.tabulationStatus
            })`
          );
        }
      }
    } else if (race.raceCallStatus === "Awaiting Ranked Choice Results") {
      if (race.officeID === "H") {
        if (!rankedChoice["House"]) {
          rankedChoice["House"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""}  (${
              race.tabulationStatus
            })`,
          ];
        } else {
          rankedChoice["House"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
      if (race.officeID === "S") {
        if (!rankedChoice["Senate"]) {
          rankedChoice["Senate"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          rankedChoice["Senate"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
      if (race.officeID === "P") {
        if (!rankedChoice["President"]) {
          rankedChoice["President"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          rankedChoice["President"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
    } else if (race.raceCallStatus === "Runoff") {
      if (race.officeID === "H") {
        if (!runoff["House"]) {
          runoff["House"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""}  (${
              race.tabulationStatus
            })`,
          ];
        } else {
          runoff["House"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
      if (race.officeID === "S") {
        if (!runoff["Senate"]) {
          runoff["Senate"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          runoff["Senate"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
      if (race.officeID === "P") {
        if (!runoff["President"]) {
          runoff["President"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          runoff["President"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
    } else if (race.raceCallStatus === "Uncalled") {
      if (race.officeID === "H") {
        if (!uncalled["House"]) {
          uncalled["House"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          uncalled["House"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
      if (race.officeID === "S") {
        if (!uncalled["Senate"]) {
          uncalled["Senate"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          uncalled["Senate"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""}  (${
              race.tabulationStatus
            })`
          );
        }
      }
      if (race.officeID === "P") {
        if (!uncalled["President"]) {
          uncalled["President"] = [
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`,
          ];
        } else {
          uncalled["President"].push(
            ` ${race.statePostal}${race.seatNum ? -race.seatNum : ""} (${
              race.tabulationStatus
            })`
          );
        }
      }
    } else if (
      !isLeadingCandidateTheWinner &&
      race.tabulationStatus === "Active Tabulation"
    ) {
      if (race.officeID === "H") {
        if (!activetabulation["House"]) {
          activetabulation["House"] = [`${race.statePostal}-${race.seatNum}`];
        } else {
          activetabulation["House"].push(`${race.statePostal}-${race.seatNum}`);
        }
      }
      if (race.officeID === "S") {
        if (!activetabulation["Senate"]) {
          activetabulation["Senate"] = [`${race.statePostal}-${race.seatNum}`];
        } else {
          activetabulation["Senate"].push(
            `${race.statePostal}-${race.seatNum}`
          );
        }
      }
      if (race.officeID === "P") {
        if (!activetabulation["President"]) {
          activetabulation["President"] = [
            `${race.statePostal}-${race.seatNum}`,
          ];
        } else {
          activetabulation["President"].push(
            `${race.statePostal}-${race.seatNum}`
          );
        }
      }
    }
  });

  Object.keys(recentlyCalled).length
    ? getMessage(recentlyCalled, RECENTLYCALLED)
    : "";
  Object.keys(activetabulation).length
    ? getMessage(activetabulation, ACTIVETABULATION, "compact")
    : "";
  Object.keys(tooClose).length ? getMessage(tooClose, TOOCLOSE) : "";
  Object.keys(unableToCall).length
    ? getMessage(unableToCall, UNABLETOCALL)
    : "";
  Object.keys(rankedChoice).length
    ? getMessage(rankedChoice, RANKEDCHOICE)
    : "";
  Object.keys(runoff).length ? getMessage(runoff, RUNOFF) : "";
  Object.keys(uncalled).length ? getMessage(uncalled, UNCALLED) : "";
}

module.exports = {
  formatMessage,
};
