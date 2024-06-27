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
