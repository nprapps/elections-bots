require("dotenv").config();
var { google } = require("googleapis");

// Format to add to gsheets
// const values = [
//   ["Wheel", "$20.50", "4", "3/1/2016"],
//   ["Door", "$15", "2", "3/15/2016"],
//   ["Engine", "$100", "1", "3/20/2016"],
// ];

async function writeElexDataToSheets(values) {
  const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

  const client = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const valueInputOption = "USER_ENTERED";

  const sheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.SHEETS_ID;
  const range = "Sheet1!A4:Z10000";

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

module.exports = {
  writeElexDataToSheets,
};
