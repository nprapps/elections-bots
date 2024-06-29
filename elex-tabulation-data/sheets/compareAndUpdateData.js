const { formatElexData } = require("../../helpers/formatElexData");
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
async function compareAndUpdateData(dataFromSheets, elexData) {
  const formattedElexData = formatElexData(elexData);

  const mergedData = dataFromSheets.concat(formattedElexData);
  const totalLength = mergedData.length;

  const updatedData = [];
  const messageData = [];
  const ids = [];

  mergedData.map((curVal, index, arr) => {
    const uniqueID = curVal.uniqueID;
    let arryToFindIn =
      index !== totalLength - 1 ? arr.slice(index + 1) : [arr[totalLength - 1]];

    if (index !== totalLength - 1) {
      arryToFindIn = arr.slice(index + 1);
      const match = arryToFindIn.find(
        (element) => element.uniqueID === uniqueID
      );
      if (match) {
        if (
          curVal.tabulationStatus !== match.tabulationStatus ||
          curVal.raceCallStatus !== match.raceCallStatus
        ) {
          match.tabulationChange =
            curVal.tabulationStatus !== match.tabulationStatus;
          match.raceCallChange = curVal.raceCallStatus !== match.raceCallStatus;
          updatedData.push(match);
          messageData.push(match);
          ids.push(match.uniqueID);
        } else {
          updatedData.push(curVal);
          ids.push(curVal.uniqueID);
        }
      } else {
        if (!ids.includes(uniqueID)) {
          updatedData.push(curVal);
        }
      }
    } else {
      if (!ids.includes(uniqueID)) {
        updatedData.push(curVal);
      }
    }
  });

  const addUpdatedDataToSheets = formatToAddToSheets(
    updatedData,
    elexData.electionDate
  );

  return [messageData, addUpdatedDataToSheets];
}

module.exports = {
  compareAndUpdateData,
};
