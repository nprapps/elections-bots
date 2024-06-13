require("dotenv").config();
var { google } = require("googleapis");
var login = require("@nprapps/google-login");

async function getDataFromSheets() {
  //   const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

  //   const client = new google.auth.GoogleAuth({
  //     credentials: GOOGLE_CREDENTIALS,
  //     scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  //   });

  //   const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SHEETS_ID;
  const range = "Sheet1!A4:Z10000";

  var auth = login.getClient();
  const sheets = google.sheets({ version: "v4", auth });

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
      let values = [];
      rows.map((v, i) => {
        let x = {
          uniqueID: v[0],
          electionDate: v[1],
          officeID: v[2],
          stateID: v[3],
          stateName: v[4],
          raceID: v[5],
          raceType: v[6],
          tabulationStatus: v[7],
          raceCallStatus: v[8],
        };

        values.push(x);
      });

      return values;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getDataFromSheets,
};
