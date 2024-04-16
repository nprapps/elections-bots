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
        const lastUpdatedDate = data[calendarYear].lastUpdate.lastUpdated;
        const testData = data[calendarYear].TestInformation
        const elexTestData = []

        //! Here we will create a function to filter the data.



        //* Format data for google sheets
        testData.map(data => {
            elexTestData.push([data.testDate, data.electionEvents, data.activity, data.testTimeET ? data.testTimeET : false])
        })

        return {lastUpdatedDate, elexTestData}
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getElexTestData
}