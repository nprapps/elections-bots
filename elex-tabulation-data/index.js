const { writeElexDataToSheets } = require("./sheets/writeElexDataToSheets");
const { getDataFromSheets } = require("./sheets/getDataFromSheets");
const { compareAndUpdateData } = require("./sheets/compareAndUpdateData");
const { getElexData } = require("./api/getElexData");
const { emptyGSheets } = require("./sheets/emptyGSheets");

(async function () {
  const [formattedElexData, dataToAddToTheSheets] = await getElexData();

  const sheetsData = await getDataFromSheets();

  if (sheetsData) {
    const [updatedValues, addUpdatedDataToSheets] = await compareAndUpdateData(
      formattedElexData,
      sheetsData
    );
    //delete everything from the sheets
    await emptyGSheets();
    await writeElexDataToSheets(addUpdatedDataToSheets);

    //send message to slack
  } else {
    await writeElexDataToSheets(dataToAddToTheSheets);
  }
})();
