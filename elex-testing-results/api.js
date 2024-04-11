var axios = require("axios");

const URL = "https://api.ap.org/v3/reports/Calendar-CustomerTesting2024-Live?format=json"
const headers = {"x-api-key": process.env.AP_API_KEY};

//this will need to be updated when needed
const calendarYear = "ElectionTestingSchedule2024"

async function getElexTestData() {
    try {
        const response = await axios({
            url: URL,
            headers
        });
        const data = response.data
        console.log(data[calendarYear]);
    } catch (error) {
        console.error(error);
    }
}

getElexTestData()