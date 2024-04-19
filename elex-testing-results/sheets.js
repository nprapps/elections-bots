require("dotenv").config();
var { google } = require("googleapis");
const { auth } = require("google-auth-library");

//! Replace them with values from AP API
const values = [
  ["Wheel", "$20.50", "4", "3/1/2016"],
  ["Door", "$15", "2", "3/15/2016"],
  ["Engine", "$100", "1", "3/20/2016"],
];

async function writeTestData(auth) {
  const client = auth.fromJSON(require("./creds.json"));
  client.scopes = ["https://www.googleapis.com/auth/spreadsheets"];
  const valueInputOption = "USER_ENTERED";

  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SHEETS_ID;
  const range = "Sheet1!A1:Z10000";

  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource: { values },
    });
    console.log("%d cells updated.", result.data.updates.updatedCells);
    return result;
  } catch (err) {
    throw err;
  }
}

writeTestData();
