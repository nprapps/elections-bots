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
