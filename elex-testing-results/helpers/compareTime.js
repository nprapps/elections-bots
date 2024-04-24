const { getTodaysTests } = require("./getTodaysTests");
const { diff_minutes } = require("./diffMinutes");

async function compareTime(elexTestData) {
  const fakeData = {
    lastUpdatedDate: "April 11, 2024",
    testInformation: [
      [
        "2024-04-24",
        "PR Dem Presidential Primary",
        "Customer Testing",
        "12:00 pm-1:00 pm",
      ],
      [
        "2024-04-24",
        "NY CD 26 Special Election",
        "Customer Testing",
        "2:30 pm-3:30 pm",
      ],
    ],
  };

  //!change this to elexTestData
  const todaysTests = getTodaysTests(fakeData);

  console.log({ todaysTests });

  const currentTime = new Date();
  const messagesToSend = [];

  todaysTests.map((data) => {
    const date = data[0];
    const time = data[3];
    if (time) {
      const startTestingTime = `${time.slice(0, 5)} pm`;
      let testingTime = new Date(`${date} ${startTestingTime}`);
      const timeDiff = diff_minutes(currentTime, testingTime);

      console.log(startTestingTime, testingTime, timeDiff);

      if (timeDiff > 0 && timeDiff <= 40) {
        messagesToSend.push(data);
      }
    }
  });
  return messagesToSend;
}

module.exports = {
  compareTime,
};
