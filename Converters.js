const formulas = {
  "lb->kg": (x) => x * 0.45359237,
  "kg->lb": (x) => x / 0.45359237,
  "mi->km": (x) => x * 1.609344,
  "km->mi": (x) => x / 1.609344,
  "C->F": (x) => (x * 9) / 5 + 32,
  "F->C": (x) => ((x - 32) * 5) / 9,
};
 
// Higher-order function: takes two units, returns a conversion function
const makeConverter = (fromUnit, toUnit) => {
  const formula = formulas[`${fromUnit}->${toUnit}`];
  if (!formula) throw new Error(`Unsupported conversion: ${fromUnit} to ${toUnit}`);
  return (input) => (Array.isArray(input) ? input.map(formula) : formula(input));
};