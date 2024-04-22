const { getDataFromSheets } = require("./getDataFromSheets");
const { writeDataToSheets } = require("./writeDataToSheets");
const { getElexTestData } = require("./getElexTestData");

(async function () {
  const isSheetEmpty = await getDataFromSheets();

  //! This is confusing as hell, make it clearer
  if (!isSheetEmpty) {
    //* The sheet is empty
    const data = await getElexTestData();

    const lastUpdatedDate = data.lastUpdatedDate;
    const elexTestData = data.formattedTestData;

    await writeDataToSheets(lastUpdatedDate, elexTestData);
  } else {
    //!We need to add logic here
    console.log("Hi");
  }
})();
