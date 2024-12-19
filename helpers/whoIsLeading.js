/**
 * This function takes an array of objects and returns the candidate leading the race.
 * @param {[{}]} candidates
 * @returns leading candidate info
 */
function whoIsLeading(candidates) {
  const leadingCandidate = candidates.reduce((candidate, arr) =>
    candidate.voteCount > arr.voteCount ? candidate : arr
  );

  return {
    name: `${leadingCandidate.first} ${leadingCandidate.last}`,
    winner: leadingCandidate.winner ? leadingCandidate.winner : "",
    party: leadingCandidate.party,
  };
}
module.exports = {
  whoIsLeading,
};
