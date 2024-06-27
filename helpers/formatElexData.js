function formatElexData(elexData) {
  const electionDate = elexData.electionDate;
  const raceData = elexData.races;

  let values = [];
  raceData.map((race, i) => {
    let x = {
      uniqueID: `${race.raceID}-${race.stateID}`,
      electionDate: electionDate,
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
    };

    values.push(x);
  });

  return values;
}
module.exports = {
  formatElexData,
};
