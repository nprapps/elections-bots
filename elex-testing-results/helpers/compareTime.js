const { getTodaysTests } = require("./getTodaysTests");
const { diff_minutes } = require("./diffMinutes");

async function compareTime(elexTestData) {
  const fakeData = {
    lastUpdatedDate: "April 11, 2024",
    testInformation: [
      [
        "2024-04-26",
        "PR Dem Presidential Primary",
        "Customer Testing",
        "3:30 pm-7:00 pm",
      ],
      [
        "2024-04-26",
        "NY CD 26 Special Election",
        "Customer Testing",
        "4:00 am-7:30 pm",
      ],
      [
        "2024-04-26",
        "NY CD 26 Special Election",
        "Customer Testing",
        "4:30 pm-7:30 pm",
      ],
      [
        "2024-04-26",
        "NY CD 26 Special Election",
        "Customer Testing",
        "12:10 pm-7:30 pm",
      ],
      [
        "2024-04-26",
        "NY CD 26 Special Election",
        "Customer Testing",
        "7:00 pm-7:30 pm",
      ],
    ],
  };

  const todaysTests = getTodaysTests(elexTestData);

  console.log({ todaysTests });

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

      console.log({ currentTime });
      console.log({ startTestingTime });
      console.log({ testingTime });
      console.log({ timeDiff });
      console.log("-------");

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
