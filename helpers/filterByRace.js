function filterByRace(raceData) {
  return raceData.filter(
    (data) =>
      data.officeID === "P" || data.officeID === "S" || data.officeID === "H"
  );
}
module.exports = {
  filterByRace,
};
