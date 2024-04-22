function formatData(filteredData) {
  const elexTestData = [];

  filteredData.map((data) => {
    elexTestData.push([
      data.testDate,
      data.electionEvents,
      data.activity,
      data.testTimeET ? data.testTimeET : false,
    ]);
  });

  return elexTestData;
}

module.exports = {
  formatData,
};
