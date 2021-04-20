// Assumptions:
// - Atleast two numbers are given in the array

function sumOfPairClosestToZero(arrNum) {

    // Assume atleast two numbers are given as part of the array
    if (arrNum < 2) {
      throw("Requires atleast two numbers");
    }
  
    minSum = arrNum[0] + arrNum[1];
  
    for (i = 0; i < arrNum.length - 1; i++) {
          for (j = i + 1; j < arrNum.length; j++) {
          sum = arrNum[i] + arrNum[j];
        if (Math.abs(minSum) > Math.abs(sum)) {
            minSum = sum;
        }
      }
    }
  
    return minSum;
}