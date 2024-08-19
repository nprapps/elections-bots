const { readMetadata } = require("./sheets/readMetadata");

async function main() {
  const shouldGARun = await readMetadata("RUN_GA!A1");
  console.log(shouldGARun.toLowerCase());
  return false;
}

main();

module.exports = {
  main,
};
