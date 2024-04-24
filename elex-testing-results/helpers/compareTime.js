const { filterTodaysData } = require("./filterTodaysData");
const { getElexTestData } = require("../getElexTestData");
const { diff_minutes } = require("./diffMinutes");
const { sendMessageToSlack } = require("../sendMessageToSlack");

async function compareTime() {
  const elexData = await getElexTestData();
  const todaysDate = new Date().toDateString();

  const fakeData = [
    [
      "2024-04-23",
      "CO NY UT State Primaries, SC Primary Runoff",
      "Customer Testing",
      "2:00 pm-3:30 pm",
    ],
    [
      "2024-04-23",
      "CO NY UT State Primaries, SC Primary Runoff",
      "Customer Testing",
      "2:30 pm-3:30 pm",
    ],
    [
      "2024-04-23",
      "CO NY UT State Primaries, SC Primary Runoff",
      "Election Day",
      false,
    ],
    ["2024-04-23", "TN State Primary", "Customer Testing", "1:00 pm-2:00 pm"],
    [
      "2024-04-23",
      "KS MI MO WA State Primaries",
      "Customer Testing",
      "4:00 pm-4:30 pm",
    ],
    [
      "2024-04-23",
      "Arizona State Primary",
      "Customer Testing",
      "4:05 pm-5:00 pm",
    ],
  ];

  //   const data = filterTodaysData(fakeData);
  const filteredData = fakeData.filter(
    (data) => new Date(`${data[0]}T00:00`).toDateString() === todaysDate
  );

  const currentTime = new Date();
  const messagesToSend = [];

  filteredData.map((data) => {
    const date = data[0];
    const time = data[3];
    if (time) {
      const startTestingTime = time.slice(0, 7);
      let testingTime = new Date(`${date} ${startTestingTime}`);
      const timeDiff = diff_minutes(currentTime, testingTime);

      if (timeDiff > 0 && timeDiff <= 40) {
        messagesToSend.push(data);
      }
    }
  });

  return messagesToSend;
}

compareTime();

module.exports = {
  compareTime,
};
