// Assumptions:
// - Assume all times are in proper UTC timestamp format therefore no error checks are done on the format
// - No lower cap specified so assume "as soon as possible" if its closer to 0 mins
// - Upper boundary cannot be in the past unless both lower and upper are in the past

const MAX_CAPPED_UPPERBOUND_MINS = 2 * 60; // 2h
const COEFF_IN_MINS = 5; // To the nearest 5 mins

/**
 * Returns the difference in minutes.
 * 
 * @param {Date} currentTimestamp 
 * @param {Date} bound
 * @returns {number} difference in minutes
 */
function findCompoundInMins(currentTimestamp, bound) {
  var diffInMins = convertMillisToMins(bound - currentTimestamp);
  var roundedInMins = Math.round(diffInMins / COEFF_IN_MINS) * COEFF_IN_MINS;

  if (diffInMins <= 0) { // Bound in the past
    return 0;
  } else if (roundedInMins > MAX_CAPPED_UPPERBOUND_MINS) { // Bound capped to max
    return MAX_CAPPED_UPPERBOUND_MINS;
  }

  return roundedInMins;
}

/**
 * Main function to display the wait estimate.
 * 
 * @param {Date} currentTimestamp 
 * @param {Date} lowerBound
 * @param {Date} upperBound
 * @returns {string} string to display
 * @throws if unable to determine the estimate
 */
function calculateWaitEstimate(currentTimestamp, lowerBound, upperBound) {
  var lowerDiffInMins = findCompoundInMins(currentTimestamp, lowerBound);
  var upperDiffInMins = findCompoundInMins(currentTimestamp, upperBound);

  if (lowerDiffInMins <= 0 && upperDiffInMins <= 0) {
    return "as soon as possible";
  } else if ((lowerDiffInMins <= 0) || (lowerDiffInMins == upperDiffInMins)) { // Only display upper bound 
    return generateDisplayString(upperDiffInMins);
  } else if (lowerDiffInMins > 0 && upperDiffInMins > 0) {
    return generateDisplayRangeString(lowerDiffInMins, upperDiffInMins);
  }
  throw "Unable to calculate the wait estimate for " + currentTimestamp;
}

// -- Helper functions

function isHoursOnly(diffInMins) {
    return (diffInMins > 60) && (diffInMins % 60 == 0)
  }
  
  function isMinsOnly(diffInMins) {
      return diffInMins < 60;
  }
  
  function convertMillisToMins(diff) {
      return Math.floor(diff / 1000 / 60);
  }
  
  function convertToHours(diffInMins) {
    return Math.floor(diffInMins / 60);
  }
  
  function generateDisplayForMinsOnly(diffInMins) {
    return diffInMins + "min";
  }
  
  function generateDisplayForHoursAndMinsOnly(diffInMins) {
    diffInHours = convertToHours(diffInMins);
    remainderInMins = diffInMins - (diffInHours * 60);
  
    if (remainderInMins > 0) {
      return diffInHours + "h " + remainderInMins + "min";
    }
    return diffInHours + "h";
  }
  
  function generateDisplayString(diffInMins) {
    if (isMinsOnly(diffInMins)) {
      return generateDisplayForMinsOnly(diffInMins);
    } else {
      return generateDisplayForHoursAndMinsOnly(diffInMins);
    }
  }
  
  function generateDisplayRangeString(lowerDiffInMins, upperDiffInMins) {
    if (isHoursOnly(lowerDiffInMins) && isHoursOnly(upperDiffInMins)) {
          return convertToHours(lowerDiffInMins) + " - " + convertToHours(upperDiffInMins) + "h";
    } else if (isMinsOnly(lowerDiffInMins) && isMinsOnly(upperDiffInMins)) {
        return lowerDiffInMins + " - " + upperDiffInMins + "min";
    }
    return generateDisplayString(lowerDiffInMins) + " - " + generateDisplayString(upperDiffInMins);
  }