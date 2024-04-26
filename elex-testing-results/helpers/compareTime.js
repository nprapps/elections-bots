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
        "2:00 pm-7:30 pm",
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

  //!change this to elexTestData
  const todaysTests = getTodaysTests(fakeData);

  console.log({ todaysTests });

  const currentTime = new Date();
  const currentTimeUTC = new Date("2024-04-26 4:00 pm").toLocaleTimeString(
    "en-US",
    {
      timeZone: "America/New_York",
    }
  );

  // console.log({ currentTime });
  // console.log({ currentTimeUTC });

  const messagesToSend = [];

  todaysTests.map((data) => {
    const date = data[0];
    const time = data[3];

    console.log({ time });
    if (time) {
      //! don't hard code pm value
      const startTestingTime = `${time.slice(0, 5)} pm`;

      //! add 4 hours to make it to UTC
      let testingTime = new Date(`${date} ${startTestingTime}`);

      const timeDiff = diff_minutes(currentTime, testingTime);

      // console.log({ startTestingTime });
      // console.log({ testingTime });

      console.log({ timeDiff });
      console.log("-------");

      if (timeDiff > -240 && timeDiff <= -280) {
        messagesToSend.push(data);
      }
    }
  });
  return messagesToSend;
}

module.exports = {
  compareTime,
};
