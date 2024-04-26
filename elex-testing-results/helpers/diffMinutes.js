//Got this function from https://www.w3resource.com/javascript-exercises/javascript-date-exercise-44.php

function diff_minutes(currentTime, testingTime) {
  console.log({ currentTime });
  console.log({ testingTime });

  // Calculate the difference in milliseconds between the two provided dates and convert it to seconds

  var diff = (currentTime.getTime() - testingTime.getTime()) / 1000;
  // Convert the difference from seconds to minutes
  diff /= 60;
  // Return the absolute value of the rounded difference in minutes

  console.log(Math.round(diff));
  return Math.round(diff);
}
// const a = new Date("2024-04-26 3:00 pm");
// const b = new Date("2024-04-26 4:20 pm");

// diff_minutes(a, b);

module.exports = {
  diff_minutes,
};
