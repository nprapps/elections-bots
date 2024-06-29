function getEmoji(party) {
  if (party === "DEM") {
    return ":blue_circle:";
  }
  if (party === "GOP") {
    return ":red_circle:";
  }
  if (party === "Ind") {
    return ":green_circle:";
  }
}

module.exports = { getEmoji };
