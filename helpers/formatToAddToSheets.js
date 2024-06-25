function formatToAddToSheets(elexData, electionDate) {
  const raceData = elexData.races ? elexData.races : elexData;
  const dataToAddToTheSheets = [];

  raceData.map((data, i) => {
    dataToAddToTheSheets.push([
      `${data.raceID}-${data.stateID}`,
      data.electionDate ? data.electionDate : electionDate,
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
