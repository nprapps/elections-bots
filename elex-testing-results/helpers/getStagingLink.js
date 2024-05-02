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

  const regex = new RegExp("\\b(" + states.join("|") + ")\\b", "g");

  const arr = [];

  data.map((d) => {
    const election = d[1];
    const abr = election.match(regex);
    arr.push(abr);
  });

  let string = "";

  arr.flat().map((state) => {
    string += `http://stage-apps.npr.org/civil-intrigue/states/${state} \n`;
  });

  return string;
}

module.exports = {
  getStagingLink,
};
