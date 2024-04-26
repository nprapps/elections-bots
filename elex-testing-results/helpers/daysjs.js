const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

function testDays() {
  const convertToUTC = (
    date,
    dateFormat = "YYYY-MM-DDTHH:MM",
    tz = "America/New_York"
  ) => {
    return dayjs.tz(date, dateFormat, tz).utc().toDate();
  };

  const currentTimeUTC = dayjs.utc().format();
  const startingTimeUTC = dayjs.utc("2024-04-25 6:00 pm").format();

  console.log({ startingTimeUTC });

  const a = convertToUTC("2024-04-25T016:00:00");
  console.log({ a });

  const b = a.getTime();
}

testDays();
