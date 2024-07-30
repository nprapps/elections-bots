var axios = require("axios");

async function getElexData() {
  try {
    const electionDates = [
      "2024-06-18",
      "2024-06-25",
      "2024-07-30",
      "2024-08-01",
      "2024-08-06",
      "2024-08-10",
      "2024-08-13",
      "2024-08-20",
      "2024-08-27",
      "2024-09-03",
      "2024-09-10",
      "2024-11-05",
    ];

    //dynamically update the URL with the dates above

    const URL =
      "https://api.ap.org/v3/elections/2024-07-30?format=JSON&officeID=D,H,S&uncontested=false";
    //?"https://api.ap.org/v3/elections/2024-06-04?format=JSON&officeID=D,H,S&uncontested=false";
    const headers = { "x-api-key": process.env.AP_API_KEY };
    const response = await axios({
      url: URL,
      headers,
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getElexData,
};
