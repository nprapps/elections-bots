require("dotenv").config();
var { google } = require("googleapis");

/**
 *
 * @param {String} range - of the google sheet
 * @returns boolean - should run github actions or not?
 */
async function readMetadata(range) {
  const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  const client = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth: client });
  const baseURL = "https://api.ap.org/v3/elections";
  const queryParam = `format=JSON&officeID=H,S,I`;
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
        return rows[0][0].toLowerCase();
      }
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readMetadata,
};
