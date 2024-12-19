const { formatElexData } = require("../../helpers/formatElexData");
const { formatToAddToSheets } = require("../../helpers/formatToAddToSheets");

/**
 * This function compares the latest AP data with the data saved in google sheets. 
 * 
 * @param {[{}]} elexData
 * @param {[{}]} dataFromSheets 
    [{
      uniqueID: string,
      electionDate: string,
      officeID: string,
      stateID: string,
      seatName: string,
      seatNum: string,
      stateName: string,
      raceID: string,
      tabulationStatus: string,
      raceCallStatus: string
    }]
 * @returns {} messageData - updated data for which we need to notify slack
 * @returns {} addUpdatedDataToSheets - 

 */
async function compareAndUpdateData(dataFromSheets, elexData) {
  const formattedElexData = formatElexData(elexData.flat());

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
        if (match.raceCallStatus == "Called") {
          updatedData.push(match);
          ids.push(match.uniqueID);
        } else if (
          (curVal.tabulationStatus !== match.tabulationStatus &&
            match.tabulationStatus !== "Vote Certified") ||
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
