/**
 * This function gets election data from AP's API
 *
 * @param {Array} endpointsToRun
 * @returns {[{}]} AP's election data
 */
async function getElexData(endpointsToRun) {
  try {
    let requestsArray = endpointsToRun.map((endpoint) => {
      let request = new Request(endpoint, {
        headers: new Headers({
          "Content-Type": "text/json",
          "x-api-key": process.env.AP_API_KEY,
        }),
        method: "GET",
      });

      return fetch(request).then((res) => res.json());
    });

    const demData = [];

    await Promise.all(requestsArray).then(([...data]) => {
      return data.map((d, i) => {
        const electionDate = d.electionDate;
        const races = d.races;
        races.map((r) => (r.electionDate = electionDate));
        demData.push(races);
      });
    });

    return demData;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getElexData,
};
