async function getUpcomingTests(testData) {
  const yesterdaysDate = new Date(new Date().setDate(new Date().getDate() - 1));

  return testData.filter(
    (data) => new Date(`${data.testDate}T00:00`) > yesterdaysDate
  );
}

module.exports = {
  getUpcomingTests,
};
