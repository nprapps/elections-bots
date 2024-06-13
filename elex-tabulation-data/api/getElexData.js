var axios = require("axios");
const { filterByRace } = require("../../helpers/filterByRace");
const { formatToAddToSheets } = require("../../helpers/formatToAddToSheets");
const { formatElexData } = require("../../helpers/formatElexData");

async function getElexData() {
  try {
    //have to connect this B3 column with the calendar to get the latest date
    const URL = "https://api.ap.org/v3/elections/2024-06-11?format=JSON";
    const headers = { "x-api-key": process.env.AP_API_KEY };
    const response = await axios({
      url: URL,
      headers,
    });

    const data = response.data;

    const electionDate = data.electionDate;
    const raceData = data.races;

    const priorityRaces = filterByRace(raceData);
    const dataToAddToTheSheets = formatToAddToSheets(
      priorityRaces,
      electionDate
    );
    const formattedElexData = formatElexData(priorityRaces, electionDate);

    return [formattedElexData, dataToAddToTheSheets];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getElexData,
};
