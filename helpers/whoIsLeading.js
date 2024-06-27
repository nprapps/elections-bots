function whoIsLeading(candidates) {
  const leadngCandidate = candidates.reduce((candidate, arr) =>
    candidate.voteCount > arr.voteCount ? candidate : arr
  );

  return `${leadngCandidate.first} ${leadngCandidate.last}`;
}
module.exports = {
  whoIsLeading,
};
