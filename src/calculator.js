function divide(a, b) {
  if (b === 0) throw new Error('Divide by zero!');
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { divide, multiply };
