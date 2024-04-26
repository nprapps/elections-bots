const { getElexTestData } = require("./api/getElexTestData");
const { sendMessageToSlack } = require("./slack/sendMessageToSlack");
const { compareTime } = require("./helpers/compareTime");

(async function () {
  const elexData = await getElexTestData();

  const upcomingTests = await compareTime(elexData);

  if (upcomingTests.length) {
    await sendMessageToSlack(upcomingTests);
  }
})();
