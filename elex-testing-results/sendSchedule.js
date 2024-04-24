const { getElexTestData } = require("./getElexTestData");
const { filterTodaysData } = require("./helpers/filterTodaysData");
const { sendMessageToSlack } = require("./sendMessageToSlack");

async function sendSchedule() {
  const elexData = await getElexTestData();

  const data = filterTodaysData(elexData);

  await sendMessageToSlack(data);
}

sendSchedule();

module.exports = {
  sendSchedule,
};
