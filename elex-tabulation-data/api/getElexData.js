var axios = require("axios");
const { getURLFromSheets } = require("../getURLFromSheets");

async function getElexData() {
  try {
    //have to connect this B3 column with the calendar to get the latest date
    const nextURL = await getURLFromSheets();
    const headers = { "x-api-key": process.env.AP_API_KEY };
    const response = await axios({
      url: nextURL,
      headers,
    });

    const dataToAddToTheSheets = [];

    const data = response.data;
    const electionDate = data.electionDate;
    const raceData = data.races;
    let values = [];

    const priorityRaces = raceData.filter(
      (data) =>
        data.officeID === "P" || data.officeID === "S" || data.officeID === "H"
    );

    priorityRaces.map((race, i) => {
      let x = {
        uniqueID: `${race.raceID}-${race.stateID}`,
        electionDate: electionDate,
        officeID: race.officeID,
        stateID: race.stateID,
        stateName: race.reportingUnits[0].stateName,
        raceID: race.raceID,
        raceType: race.raceType,
        tabulationStatus: race.tabulationStatus,
        raceCallStatus: race.raceCallStatus,
      };

      values.push(x);
    });

    priorityRaces.map((data, i) => {
      dataToAddToTheSheets.push([
        `${data.raceID}-${data.stateID}`,
        electionDate,
        data.officeID,
        data.stateID,
        data.reportingUnits[0].stateName,
        data.raceID,
        data.raceType,
        data.tabulationStatus,
        data.raceCallStatus,
      ]);
    });

    const nextrequest = data.nextrequest;

    return [nextrequest, dataToAddToTheSheets, values];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getElexData,
};
