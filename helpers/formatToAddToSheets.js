function formatToAddToSheets(priorityRaces, electionDate) {
  const dataToAddToTheSheets = [];

  priorityRaces.map((data, i) => {
    dataToAddToTheSheets.push([
      `${data.raceID}-${data.stateID}`,
      electionDate,
      data.officeID,
      data.stateID,
      data.seatName,
      data.seatNum,
      data.reportingUnits ? data.reportingUnits[0].stateName : data.stateName,
      data.raceID,
      data.raceType,
      data.tabulationStatus,
      data.raceCallStatus,
    ]);
  });

  return dataToAddToTheSheets;
}
module.exports = {
  formatToAddToSheets,
};
