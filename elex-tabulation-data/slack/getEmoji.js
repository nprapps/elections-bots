function getEmoji(party) {
  if (party.toLowerCase() === "DEM".toLowerCase()) {
    return ":large_blue_circle:";
  }
  if (party.toLowerCase() === "GOP".toLowerCase()) {
    return ":red_circle:";
  }
  if (party.toLowerCase() === "Ind".toLowerCase()) {
    return ":large_green_circle:";
  }
}

module.exports = { getEmoji };
