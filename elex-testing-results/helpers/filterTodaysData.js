function filterTodaysData(elexData) {
  const todaysDate = new Date().toDateString();

  const filteredData = elexData.formattedTestData.filter(
    (data) => new Date(`${data[0]}T00:00`).toDateString() === todaysDate
  );

  return filteredData;
}

module.exports = {
  filterTodaysData,
};
