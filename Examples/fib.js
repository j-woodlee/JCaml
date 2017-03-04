const fib = (a) => {
  if (a === 0 || a === 1) {
    return 1;
  }
  return fib(a - 1) + fib(a - 2);
};
