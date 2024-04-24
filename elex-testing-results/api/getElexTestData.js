var axios = require("axios");
const { getUpcomingTests } = require("../helpers/getUpcomingTests");
const { formatData } = require("../helpers/formatData");

const URL =
  "https://api.ap.org/v3/reports/Calendar-CustomerTesting2024-Live?format=json";
const headers = { "x-api-key": process.env.AP_API_KEY };

//this will need to be updated when needed
const calendarYear = "ElectionTestingSchedule2024";

async function getElexTestData() {
  try {
    const response = await axios({
      url: URL,
      headers,
    });

    const data = response.data;
    const lastUpdatedDate = data[calendarYear].lastUpdate.lastUpdated;
    const testData = data[calendarYear].TestInformation;
    const filteredData = await getUpcomingTests(testData);
    const testInformation = formatData(filteredData);

    return { lastUpdatedDate, testInformation };
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getElexTestData,
};
