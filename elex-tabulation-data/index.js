const { writeElexDataToSheets } = require("./sheets/writeElexDataToSheets");
const { getDataFromSheets } = require("./sheets/getDataFromSheets");
const { compareAndUpdateData } = require("./sheets/compareAndUpdateData");
const { getElexData } = require("./api/getElexData");
const { updateNextRequestURL } = require("./sheets/updateNextRequestURL");
const { getURLFromSheets } = require("./getURLFromSheets");

(async function () {
  const [nextrequest, dataToAddToTheSheets, compareValues] =
    await getElexData();
  await updateNextRequestURL([[nextrequest]]);
  await writeElexDataToSheets(dataToAddToTheSheets);

  // if (dataToAddToTheSheets) {
  //   const dataFromSheets = await getDataFromSheets();
  //   if (dataFromSheets) {
  //     await compareAndUpdateData(compareValues, dataFromSheets);
  //   } else {
  //     await writeElexDataToSheets(dataToAddToTheSheets);
  //   }
  // }
})();
