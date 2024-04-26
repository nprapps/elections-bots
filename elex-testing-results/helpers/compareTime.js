const { getTodaysTests } = require("./getTodaysTests");
const { diff_minutes } = require("./diffMinutes");

async function compareTime(elexTestData) {
  const fakeData = {
    lastUpdatedDate: "April 11, 2024",
    testInformation: [
      [
        "2024-04-25",
        "PR Dem Presidential Primary",
        "Customer Testing",
        "6:00 pm-7:00 pm",
      ],
      [
        "2024-04-25",
        "NY CD 26 Special Election",
        "Customer Testing",
        "6:30 pm-7:30 pm",
      ],
      [
        "2024-04-25",
        "NY CD 26 Special Election",
        "Customer Testing",
        "7:00 pm-7:30 pm",
      ],
    ],
  };

  //!change this to elexTestData
  const todaysTests = getTodaysTests(elexTestData);

  console.log({ todaysTests });

  const currentTime = new Date();
  const currentTimeEST = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
  });

  const messagesToSend = [];

  todaysTests.map((data) => {
    const date = data[0];
    const time = data[3];
    if (time) {
      //! We need to change it to UTC time
      const startTestingTime = `${time.slice(0, 5)} pm`;

      let testingTime = new Date(`${date} ${startTestingTime}`);
      let testingTimeUTC = Date.parse(new Date(`${date} ${startTestingTime}`));

      const timeDiff = diff_minutes(currentTime, testingTimeUTC);

      console.log({ timeDiff });
      console.log("-------");

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
