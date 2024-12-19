/**
 * This function takes an array of objects and returns the candidate winning the race or empty string if the winner hasn't been announced
 * @param {[{}]} candidates
 * @returns First and Last name of the winning candidate
 */
function getTheWinner(candidates) {
  const winnerData = candidates.filter((candidate) => candidate.winner);
  const winner = winnerData[0].winner
    ? `${winnerData[0].first} ${winnerData[0].last}`
    : "";

  return winner;
}

module.exports = {
  getTheWinner,
};
