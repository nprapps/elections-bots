/**
 * This functions formats the election data (which is an array of objects)
 * so it's easier to compare it with the google sheets data (which is a nested array)
 *
 * @param {[{}]} elexData
 * @returns {[{
        uniqueID: string,
        electionDate: string,
        officeID: string,
        officeName: string,
        stateID: string,
        seatName: string,
        seatNum: string,
        stateName: string,
        raceID: string,
        raceType: string,
        tabulationStatus: string,
        raceCallStatus: string,
        candidates: [{}],
        statePostal: number
      }]} 
    formatted data
      
 */
function formatElexData(elexData) {
  let values = [];
  elexData.map((race, i) => {
    let x = {
      uniqueID: `${race.raceID}-${race.stateID}`,
      electionDate: race.electionDate,
      officeID: race.officeID,
      officeName: race.officeName,
      stateID: race.stateID,
      seatName: race.seatName,
      seatNum: race.seatNum,
      stateName: race.reportingUnits[0].stateName,
      raceID: race.raceID,
      raceType: race.raceType,
      tabulationStatus: race.tabulationStatus,
      raceCallStatus: race.raceCallStatus,
      candidates: race.reportingUnits[0].candidates,
      statePostal: race.reportingUnits[0].statePostal,
    };

    values.push(x);
  });

  return values;
}
module.exports = {
  formatElexData,
};
