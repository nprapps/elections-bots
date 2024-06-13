const { formatToAddToSheets } = require("../../helpers/formatToAddToSheets");

/**
 * @param {*} formattedElexData
 * @param {*} dataFromSheets 
    [{
      uniqueID: '41902-41',
      electionDate: undefined,
      officeID: 'H',
      stateID: '41',
      seatName: "",
      seatNum: "",
      stateName: undefined,
      raceID: '41902',
      tabulationStatus: 'Active Tabulation',
      raceCallStatus: 'Too Early to Call'
    }]
 */
async function compareAndUpdateData(formattedElexData, dataFromSheets) {
  const updatedValues = [];

  for (let i = 0; i < formattedElexData.length; i++) {
    if (
      formattedElexData[i].tabulationStatus !==
        dataFromSheets[i].tabulationStatus ||
      formattedElexData[i].raceCallStatus !== dataFromSheets[i].raceCallStatus
    ) {
      dataFromSheets[i].raceCallStatus = formattedElexData[i].raceCallStatus;
      dataFromSheets[i].tabulationStatus =
        formattedElexData[i].tabulationStatus;

      updatedValues.push(formattedElexData[i]);
    }
  }
  const addUpdatedDataToSheets = formatToAddToSheets(
    dataFromSheets,
    "2024-06-11"
  );

  return [updatedValues, addUpdatedDataToSheets];
}

module.exports = {
  compareAndUpdateData,
};
