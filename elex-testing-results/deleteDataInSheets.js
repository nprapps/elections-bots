require("dotenv").config();
var { google } = require("googleapis");
var login = require("@nprapps/google-login");

async function deleteDataInSheets() {
  const spreadsheetId = process.env.SHEETS_ID;
  const range = "Sheet1!A1:Z10000";

  var auth = login.getClient();
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const result = await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    });
    console.log("Data cleared");
    return result;
  } catch (err) {
    throw err;
  }
}

deleteDataInSheets();
module.exports = {
  deleteDataInSheets,
};
