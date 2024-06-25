const { writeElexDataToSheets } = require("./sheets/writeElexDataToSheets");
const { getDataFromSheets } = require("./sheets/getDataFromSheets");
const { compareAndUpdateData } = require("./sheets/compareAndUpdateData");
const { getElexData } = require("./api/getElexData");
const { emptyGSheets } = require("./sheets/emptyGSheets");
const { sendMessageToSlack } = require("./slack/sendMessageToSlack");
const { formatToAddToSheets } = require("../helpers/formatToAddToSheets");

(async function () {
  const elexData = await getElexData();

  const sheetsData = await getDataFromSheets();

  if (sheetsData) {
    const [messageData, addUpdatedDataToSheets] = await compareAndUpdateData(
      sheetsData,
      elexData
    );

    // ? delete everything from the sheets
    await emptyGSheets();
    await writeElexDataToSheets(addUpdatedDataToSheets);

    // ? send message to slack
    if (messageData.length > 0) {
      console.log({ messageData });
      await sendMessageToSlack(messageData);
    }
  } else {
    const dataToAddToTheSheets = formatToAddToSheets(
      elexData,
      elexData.electionDate
    );
    await writeElexDataToSheets(dataToAddToTheSheets);
  }
})();
