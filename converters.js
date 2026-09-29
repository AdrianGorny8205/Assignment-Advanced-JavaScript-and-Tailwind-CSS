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

function switchTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.add("hidden");
    });

  
    document.querySelectorAll(".tab-button").forEach(button => {
        button.classList.remove("bg-blue-600");
        button.classList.add("hover:bg-gray-700");
    });


    document.getElementById(tabName).classList.remove("hidden");


    const activeButton = document.getElementById(tabName + "Tab");
    activeButton.classList.add("bg-blue-600");
    activeButton.classList.remove("hover:bg-gray-700");
}



function getInputValues(input) {


    const values = input
        .split(",")
        .map(value => value.trim())
        .filter(value => value !== "");


    const numbers = values.map(Number);


    if (numbers.some(number => Number.isNaN(number))) {
        throw new Error("Please enter numbers only.");
    }


    if (numbers.length === 1) {
        return numbers[0];
    }


    return numbers;
}

function convertWeight() {

    try {
        const input = document.getElementById("weightInput").value;
        const direction = document.getElementById("weightDirection").value;

        const values = getInputValues(input);

        const [fromUnit, toUnit] = direction.split("-");

        const converter = makeConverter(fromUnit, toUnit);

        const result = converter(values);

        document.getElementById("weightResult").textContent =
            `Result: ${formatResult(result)}`;

    } catch (error) {
        document.getElementById("weightResult").textContent =
            error.message;
    }
}

function convertDistance() {

    try {
        const input = document.getElementById("distanceInput").value;
        const direction = document.getElementById("distanceDirection").value;

        const values = getInputValues(input);

        const [fromUnit, toUnit] = direction.split("-");

        const converter = makeConverter(fromUnit, toUnit);

        const result = converter(values);

        document.getElementById("distanceResult").textContent =
            `Result: ${formatResult(result)}`;

    } catch (error) {
        document.getElementById("distanceResult").textContent =
            error.message;
    }
}

function convertTemperature() {

    try {
        const input = document.getElementById("temperatureInput").value;
        const direction = document.getElementById("temperatureDirection").value;

        const values = getInputValues(input);

        const [fromUnit, toUnit] = direction.split("-");

        const converter = makeConverter(fromUnit, toUnit);

        const result = converter(values);

        document.getElementById("temperatureResult").textContent =
            `Result: ${formatResult(result)}`;

    } catch (error) {
        document.getElementById("temperatureResult").textContent =
            error.message;
    }
}

function formatResult(result) {

    if (Array.isArray(result)) {
        return result.map(number => number.toFixed(2)).join(", ");
    }

    return result.toFixed(2);
}