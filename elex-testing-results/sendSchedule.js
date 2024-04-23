const { getElexTestData } = require("./getElexTestData");
const { sendMessageToSlack } = require("./sendMessageToSlack");

async function sendSchedule() {
  const elexData = await getElexTestData();
  const todaysDate = new Date().toDateString();

  const data = elexData.formattedTestData.filter(
    (data) => new Date(`${data[0]}T00:00`).toDateString() === todaysDate
  );

  await sendMessageToSlack(data);
}

module.exports = {
  sendSchedule,
};
