async function getStagingLink(data) {
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "AS",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "TT",
    "UT",
    "VT",
    "VA",
    "VI",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  // Got the code from https://www.codeproject.com/Questions/1165215/Javascript-regexp-find-words-from-array-in-string
  const regex = new RegExp("\\b(" + states.join("|") + ")\\b", "g");

  const arr = [];

  data.map((d) => {
    const election = d[1];
    const abr = election.match(regex);
    arr.push(abr);
  });

  let string = "\n \n Find the staging website for the states here: ";
  let flatArray = arr.flat();
  flatArray.map((state, i) => {
    string += `<http://stage-apps.npr.org/civil-intrigue/states/${state}.html?eternal|${state}>${
      i === flatArray.length - 1 ? "" : ", "
    }`;
  });

  return string;
}

module.exports = {
  getStagingLink,
};
