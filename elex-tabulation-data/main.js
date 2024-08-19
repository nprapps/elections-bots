const { readMetadata } = require("./sheets/readMetadata");

async function main() {
  const shouldGARun = await readMetadata("RUN_GA!A1");
  const output = Boolean(shouldGARun);
  console.log(output);
  return false;
}

main();

module.exports = {
  main,
};
