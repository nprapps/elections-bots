const { writeElexDataToSheets } = require("./sheets/writeElexDataToSheets");
const { getDataFromSheets } = require("./sheets/getDataFromSheets");
const { compareAndUpdateData } = require("./sheets/compareAndUpdateData");
const { getElexData } = require("./api/getElexData");
const { emptyGSheets } = require("./sheets/emptyGSheets");
const { formatToAddToSheets } = require("../helpers/formatToAddToSheets");
const { formatMessage } = require("./slack/formatMessage");
const { readMetadata } = require("./sheets/readMetadata");

(async function () {
  const shouldGARun = await readMetadata("RUN_GA!A1");

  if (shouldGARun === "TRUE".toLowerCase()) {
    const endpointsToRun = await readMetadata("Metadata!A2:Z10000");

    const elexData = await getElexData(endpointsToRun);
    const sheetsData = await getDataFromSheets();

    if (sheetsData) {
      const [messageData, addUpdatedDataToSheets] = await compareAndUpdateData(
        sheetsData,
        elexData
      );
      // ? delete everything from the sheets
      await emptyGSheets();
      await writeElexDataToSheets(addUpdatedDataToSheets);
      // ? send message to slack if there is any updated data
      if (messageData.length > 0) {
        await formatMessage(messageData);
      }
    } else {
      const dataToAddToTheSheets = formatToAddToSheets(
        elexData[0],
        elexData.electionDate
      );

      await writeElexDataToSheets(dataToAddToTheSheets);
    }
  }
})();
