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
