const { getElexTestData } = require("./getElexTestData");
const { sendMessageToSlack } = require("./sendMessageToSlack");
const { getDataFromSheets } = require("./getDataFromSheets");

(async function () {
  console.log("Hello! We are testing github actions");

  const isSheetEmpty = await getDataFromSheets();
  console.log({ isSheetEmpty });
  // const data = await getElexTestData();
  // console.log("data.lastUpdatedDate: ", data.lastUpdatedDate);
  // await sendMessageToSlack();
})();
