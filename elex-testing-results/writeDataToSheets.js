require("dotenv").config();
var { google } = require("googleapis");
const { updateDateInSheets } = require("./updateDateInSheets");
const { sendMessageToSlack } = require("./sendMessageToSlack");

async function writeDataToSheets(lastUpdatedDate, values) {
  const spreadsheetId = process.env.SHEETS_ID;
  const range = "Sheet1!A4:Z10000";
  const valueInputOption = "USER_ENTERED";
  const GOOGLE_CREDS = JSON.parse(process.env.GOOGLE_CREDS);

  const client = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  await updateDateInSheets(lastUpdatedDate);
  const sheets = google.sheets({ version: "v4", auth: client });

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
    await sendMessageToSlack();

    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  writeDataToSheets,
};
