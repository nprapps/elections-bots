const { whoIsLeading } = require("../../helpers/whoIsLeading");
const { slackMessage } = require("./slackMessage");
const { getEmoji } = require("./getEmoji");

//? test candidates
const races = [
  {
    uniqueID: "6243-6",
    officeID: "H",
    officeName: "U.S. House",
    seatName: "District 4",
    seatNum: "4",
    statePostal: "CO",
    stateName: "Colorado",
    raceID: "6243",
    raceType: "Primary",
    tabulationStatus: "Tabulation Paused",
    raceCallStatus: "Called",
    candidates: [
      {
        first: "Trisha",
        last: "Calvarese",
        party: "Dem",
        voteCount: 22437,
      },
      {
        first: "Ike",
        last: "McCorkle",
        party: "Dem",
        voteCount: 20441,
      },
    ],

    tabulationChange: true,
    raceCallChange: false,
  },
  {
    uniqueID: "6485-6",
    electionDate: "2024-06-25",
    officeID: "H",
    officeName: "U.S. House",
    stateID: "6",
    seatName: "District 3",
    seatNum: "3",
    stateName: "Texas",
    statePostal: "TX",
    raceID: "6485",
    raceType: "Primary",
    tabulationStatus: "Tabulation Paused",
    raceCallStatus: "Called",
    candidates: [
      {
        first: "Jeff",
        last: "Hurd",
        party: "GOP",
        candidateID: "164158",
        ballotOrder: 6,
        polID: "164158",
        polNum: "164158",
        voteCount: 36238,
        winner: "X",
        winnerDateTime: "2024-06-26T02:11:22.709Z",
      },
      {
        first: "Ron",
        last: "Hanks",
        party: "GOP",
        voteCount: 24977,
      },
    ],
    tabulationChange: true,
    raceCallChange: false,
  },
  {
    uniqueID: "6486-6",
    electionDate: "2024-06-25",
    officeID: "H",
    officeName: "U.S. House",
    stateID: "6",
    seatName: "District 4",
    seatNum: "4",
    stateName: "California",
    statePostal: "CA",
    raceID: "6486",
    raceType: "Primary",
    tabulationStatus: "Tabulation Paused",
    raceCallStatus: "Called",
    candidates: [
      {
        first: "Lauren",
        last: "Boebert",
        party: "GOP",
        voteCount: 53573,
        winner: "X",
        winnerDateTime: "2024-06-26T01:22:04.103Z",
      },
      {
        first: "Jerry",
        last: "Sonnenberg",
        party: "GOP",
        voteCount: 17571,
      },
    ],
    tabulationChange: true,
    raceCallChange: false,
  },
  {
    uniqueID: "6487-6",
    electionDate: "2024-06-25",
    officeID: "H",
    officeName: "U.S. House",
    stateID: "6",
    seatName: "District 5",
    seatNum: "5",
    statePostal: "CO",
    stateName: "Colorado",
    raceID: "6487",
    raceType: "Primary",
    tabulationStatus: "Tabulation Paused",
    raceCallStatus: "Called",
    candidates: [
      {
        first: "Jeff",
        last: "Crank",
        party: "GOP",
        voteCount: 56437,
        winner: "X",
        winnerDateTime: "2024-06-26T02:01:26.612Z",
      },
      {
        first: "Dave",
        middle: "L.",
        last: "Williams",
        party: "GOP",
        voteCount: 30101,
      },
    ],
    tabulationChange: true,
    raceCallChange: false,
  },
  {
    uniqueID: "6722-6",
    electionDate: "2024-06-25",
    officeID: "H",
    officeName: "U.S. House",
    stateID: "6",
    seatName: "District 12",
    seatNum: "12",
    statePostal: "CO",
    stateName: "Colorado",
    raceID: "6722",
    raceType: "Primary",
    tabulationStatus: "Active Tabulation",
    raceCallStatus: "Called",
    candidates: [
      {
        first: "River",
        last: "Gassen",
        party: "Dem",
        voteCount: 20717,
      },
      {
        first: "Joe",
        last: "Reagan",
        party: "Dem",
        voteCount: 20235,
      },
    ],
    tabulationChange: true,
    raceCallChange: false,
  },
  {
    uniqueID: "29858-5",
    officeID: "P",
    officeName: "President",
    stateID: "6",
    seatName: "District 5",
    seatNum: "1",
    statePostal: "NY",
    stateName: "New York",
    raceID: "6722",
    raceType: "Primary",
    tabulationStatus: "Active Tabulation",
    raceCallStatus: "Too Close to Call",
    candidates: [
      {
        first: "River",
        last: "Gassen",
        party: "Dem",
        voteCount: 20717,
      },
      {
        first: "Joe",
        last: "Reagan",
        party: "Dem",
        voteCount: 20235,
      },
    ],
    tabulationChange: true,
    raceCallChange: false,
  },
];

function formatMessage(races) {
  const message = {
    "Recently called": [],
    "Now in active tabulation": { President: [], Senate: [], House: [] },
    "Too Close to Call": { President: [], Senate: [], House: [] },
    "Unable to Call": { President: [], Senate: [], House: [] },
    "Awaiting Ranked Choice Results": { President: [], Senate: [], House: [] },
    Runoff: { President: [], Senate: [], House: [] },
  };

  races.map((race) => {
    const winner = whoIsLeading(race.candidates);
    const leadingCandidate = winner.name;
    const isLeadingCandidateTheWinner = winner.winner;

    if (isLeadingCandidateTheWinner) {
      message["Recently called"].push(
        `   • ${race.officeName} : ${race.statePostal} (${getEmoji(
          winner.party
        )} ${leadingCandidate} - ${winner.party})`
      );
    } else if (race.raceCallStatus === "Too Close to Call") {
      if (race.officeID === "H") {
        message["Too Close to Call"]["House"].push(
          `${race.officeName}: ${race.statePostal} (${race.activeTabulation})`
        );
      }
      if (race.officeID === "S") {
        message["Too Close to Call"]["Senate"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
      if (race.officeID === "P") {
        message["Too Close to Call"]["President"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
    } else if (race.raceCallStatus === "Unable to Call") {
      if (race.officeID === "H") {
        message["Unable to Call"]["House"].push(
          `${race.officeName}: ${race.statePostal} (${race.activeTabulation})`
        );
      }
      if (race.officeID === "S") {
        message["Unable to Call"]["Senate"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
      if (race.officeID === "P") {
        message["Unable to Call"]["President"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
    } else if (race.raceCallStatus === "Awaiting Ranked Choice Results") {
      if (race.officeID === "H") {
        message["Awaiting Ranked Choice Results"]["House"].push(
          `${race.officeName}: ${race.statePostal} (${race.activeTabulation})`
        );
      }
      if (race.officeID === "S") {
        message["Awaiting Ranked Choice Results"]["Senate"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
      if (race.officeID === "P") {
        message["Awaiting Ranked Choice Results"]["President"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
    } else if (race.raceCallStatus === "Runoff") {
      if (race.officeID === "H") {
        message["Runoff"]["House"].push(
          `${race.officeName}: ${race.statePostal} (${race.activeTabulation})`
        );
      }
      if (race.officeID === "S") {
        message["Runoff"]["Senate"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
      if (race.officeID === "P") {
        message["Runoff"]["President"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
    } else if (race.raceCallStatus === "Uncalled") {
      if (race.officeID === "H") {
        message["Uncalled"]["House"].push(
          `${race.officeName}: ${race.statePostal} (${race.activeTabulation})`
        );
      }
      if (race.officeID === "S") {
        message["Uncalled"]["Senate"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
      if (race.officeID === "P") {
        message["Uncalled"]["President"].push(
          `${race.officeName}: ${race.statePostal} (${race.tabulationStatus})`
        );
      }
    } else if (
      !isLeadingCandidateTheWinner &&
      race.tabulationStatus === "Active Tabulation"
    ) {
      if (race.officeID === "H") {
        message["Now in active tabulation"]["House"].push(
          `${race.statePostal}-${race.seatNum}`
        );
      }
      if (race.officeID === "S") {
        message["Now in active tabulation"]["Senate"].push(
          `${race.statePostal}-${race.seatNum}`
        );
      }
    }
  });

  slackMessage(message);
}

module.exports = {
  formatMessage,
};
