const countOccurences = (v, l) => {
  let sum = 0;
  for (const value of l) {
    if (v === value) {
      sum += 1;
    }
  }
  return sum;
};
