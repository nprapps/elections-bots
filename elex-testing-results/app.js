const { getDataFromSheets } = require("./getDataFromSheets");
const { sendMessageToSlack } = require("./sendMessageToSlack");

(async function () {
  console.log("Hello! We are testing github actions");

  //   const isSheetEmpty = await getDataFromSheets();
  //   console.log({ isSheetEmpty });
  await sendMessageToSlack();
})();
