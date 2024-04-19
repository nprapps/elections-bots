require("dotenv").config();
var { google } = require("googleapis");

async function getDataFromSheets() {
  console.log("Before");
  const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  console.log("After creds");

  const client = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  console.log("After auth");

  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SHEETS_ID;
  const range = "Sheet1!A1:Z10000";

  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    console.log("After result");

    const rows = result.data.values;
    if (!rows || rows.length === 0) {
      console.log("No data found.");
      return 0;
    } else {
      return 1;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getDataFromSheets,
};
