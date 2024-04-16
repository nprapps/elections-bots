const { getDataFromSheets } = require("./getDataFromSheets");

(async function () {
  console.log("Hello! We are testing github actions");

  const isSheetEmpty = await getDataFromSheets();
  console.log({ isSheetEmpty });
})();
