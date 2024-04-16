require("dotenv").config();
var { google } = require("googleapis");
var login = require("@nprapps/google-login");

async function getDataFromSheets() {
  const spreadsheetId = process.env.SHEETS_ID;
  const range = "Sheet1!A1:B1";

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
      return 1;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getDataFromSheets,
};
