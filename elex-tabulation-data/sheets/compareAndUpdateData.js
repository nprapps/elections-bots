/**
 * 
 * @param {*} dataFromSheets 
  [{
    uniqueID: '41902-41',
    electionDate: undefined,
    officeID: 'H',
    stateID: '41',
    stateName: undefined,
    raceID: '41902',
    tabulationStatus: 'Active Tabulation',
    raceCallStatus: 'Too Early to Call'
  }]
* @param {*} dataToAddToSheets
  [{
    uniqueID: '41902-41',
    electionDate: undefined,
    officeID: 'H',
    stateID: '41',
    stateName: undefined,
    raceID: '41902',
    tabulationStatus: 'Active Tabulation',
    raceCallStatus: 'Too Early to Call'
  }]
 */
async function compareAndUpdateData(dataToAddToTheSheets, dataFromSheets) {
  dataFromSheets.map((fromSheets) => {
    dataToAddToTheSheets.filter((toSheets) => {
      if (toSheets.uniqueID === fromSheets.uniqueID) {
        console.log(toSheets, fromSheets);
        //check for tabulationStatus and raceCallStatus
        if (toSheets.tabulationStatus !== fromSheets.tabulationStatus) {
          fromSheets.tabulationStatus === toSheets.tabulationStatus;
        }
        if (toSheets.raceCallStatus !== fromSheets.raceCallStatus) {
          fromSheets.raceCallStatus === toSheets.raceCallStatus;
        }
      }
    });
  });
  console.log("-----------------------------");

  console.log({ dataToAddToTheSheets }, dataToAddToTheSheets.length);
}

module.exports = {
  compareAndUpdateData,
};
