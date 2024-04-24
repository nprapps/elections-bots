function getTodaysTests(elexData) {
  const todaysDate = new Date().toDateString();

  const filteredData = elexData.testInformation.filter(
    (data) => new Date(`${data[0]}T00:00`).toDateString() === todaysDate
  );

  return filteredData;
}

module.exports = {
  getTodaysTests,
};
