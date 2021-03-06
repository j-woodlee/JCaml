
const dictionary = {};
const fibMem = (a) => {
  if (a === 0 || a === 1) {
    return 1;
  } else if (a in dictionary) {
    return dictionary[a];
  }
  dictionary[a] = fibMem(a - 1) + fibMem(a - 2);
  return dictionary[a];
};
