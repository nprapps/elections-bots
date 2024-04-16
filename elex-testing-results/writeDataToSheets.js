require("dotenv").config();
var { google } = require("googleapis");
// var login = require("@nprapps/google-login");
var login = require("./auth");
const { updateDateInSheets } = require("./updateDateInSheets");
const { sendMessageToSlack } = require("./sendMessageToSlack");

async function writeDataToSheets(lastUpdatedDate, values) {
  const spreadsheetId = process.env.SHEETS_ID;
  const range = "Sheet1!A4:Z10000";
  const valueInputOption = "USER_ENTERED";

  await updateDateInSheets(lastUpdatedDate);

  var auth = login.getClient();
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource: { values },
    });

    console.log("%d cells updated.", result.data.updates.updatedCells);

    //! Check if there is any upcoming test data for today
    // if(upcomingTests){
    //     start the cron job for today
    //
    //     send slack message accordingly
    // } else {
    //     do nothing
    // }
    // await sendMessageToSlack()

    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  writeDataToSheets,
};
