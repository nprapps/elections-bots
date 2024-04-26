//Got this function from https://www.w3resource.com/javascript-exercises/javascript-date-exercise-44.php

function diff_minutes(currentTime, testingTime) {
  // Calculate the difference in milliseconds between the two provided dates and convert it to seconds

  var diff = (currentTime.getTime() - testingTime.getTime()) / 1000;
  // Convert the difference from seconds to minutes
  diff /= 60;
  // Return the absolute value of the rounded difference in minutes

  console.log(Math.round(diff));
  return Math.round(diff);
}

module.exports = {
  diff_minutes,
};
