const { getElexTestData } = require("../api/getElexTestData");
const { getTodaysTests } = require("../helpers/getTodaysTests");
const { sendMessageToSlack } = require("./sendMessageToSlack");

async function sendSchedule() {
  const elexData = await getElexTestData();

  const data = getTodaysTests(elexData);

  if (data.length) {
    await sendMessageToSlack(data, "scheduleMessage");
  }
}

sendSchedule();

module.exports = {
  sendSchedule,
};
