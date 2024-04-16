require("dotenv").config();
var { google } = require("googleapis");
// var login = require("@nprapps/google-login");
var login = require("./auth");

async function updateDateInSheets(lastUpdatedDate) {
  const spreadsheetId = process.env.SHEETS_ID;
  const range = "Sheet1!A1:B1";
  const valueInputOption = "USER_ENTERED";

  const values = [["Last Updated Date", lastUpdatedDate]];

  var auth = login.getClient();
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const result = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource: { values },
    });
    console.log("%d cell updated with AP data.", result.data.updatedCells);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  updateDateInSheets,
};
