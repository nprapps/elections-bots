require("dotenv").config();
var { google } = require("googleapis");

// rows: [
//     [ '6/18/2024', 'FALSE', 'FALSE', 'FALSE', 'TRUE' ],
//     [ '6/25/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '7/30/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '8/1/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '8/6/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '8/10/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '8/13/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '8/20/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '8/27/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '9/3/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '9/10/2024', 'FALSE', 'FALSE', 'FALSE' ],
//     [ '11/5/2024', 'FALSE', 'TRUE', 'TRUE' ]
//   ]

async function readMetadata(range) {
  const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

  const client = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth: client });
  const baseURL = "https://api.ap.org/v3/elections";
  const queryParam = `format=JSON&officeID=D,H,S&uncontested=false`;
  const spreadsheetId = process.env.SHEETS_ID;

  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = result.data.values;
    if (!rows || rows.length === 0) {
      console.log("No data found.");
      return 0;
    } else {
      let endpoints = [];
      if (rows[0].length > 1) {
        //? This is the metadata tab
        rows.map((row) => {
          const electionDate = row[0];
          const shouldEndpointRun = row[3];
          if (shouldEndpointRun.toLowerCase() === "TRUE".toLowerCase()) {
            endpoints.push(`${baseURL}/${electionDate}?${queryParam}`);
          }
        });
        return endpoints;
      } else {
        //? This is the ga_run tab
        console.log(rows[0][0]);
        return rows[0][0];
      }
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readMetadata,
};
