require("dotenv").config();
var { google } = require("googleapis");
var login = require("@nprapps/google-login");

const spreadsheetId = process.env.SHEETS_ID;
const range = "Sheet2!B1";
const valueInputOption = "USER_ENTERED";

async function updateNextRequestURL(values) {
  var auth = login.getClient();
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const result = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource: { values },
    });
    console.log(`Date added in ${range}`);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  updateNextRequestURL,
};
