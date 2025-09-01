const { divide } = require('../src/calculator');
try {
  divide(1,0);
  console.log("No error thrown! BUG: divide by zero not handled.");
} catch {
  console.log("Correct: error thrown for divide by zero.");
}
