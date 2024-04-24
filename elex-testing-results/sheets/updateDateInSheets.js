require("dotenv").config();
var { google } = require("googleapis");

async function updateDateInSheets(lastUpdatedDate) {
  const range = "Sheet1!A1:B1";
  const valueInputOption = "USER_ENTERED";
  const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

  const client = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SHEETS_ID;

  const values = [["Last Updated Date", lastUpdatedDate]];

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
