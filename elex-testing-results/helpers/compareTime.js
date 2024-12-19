const { getTodaysTests } = require("./getTodaysTests");
const { diff_minutes } = require("./diffMinutes");

async function compareTime(elexTestData) {
  const todaysTests = getTodaysTests(elexTestData);
  const currentTime = new Date();

  const messagesToSend = [];

  todaysTests.map((data) => {
    const date = data[0];
    const time = data[3];

    if (time) {
      const timePeriod = time.split("-")[0].slice(-2);
      const startTestingTime = `${time.slice(0, 5)} ${timePeriod}`;

      let testingTime = new Date(`${date} ${startTestingTime}`);

      const timeDiff = diff_minutes(currentTime, testingTime);

      if (timeDiff >= 220 && timeDiff <= 245) {
        messagesToSend.push(data);
      }
    }
  });
  return messagesToSend;
}

module.exports = {
  compareTime,
};
