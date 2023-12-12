import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    const updateDisplay = () => {
      setDisplay(currentInput === "" ? "0" : currentInput);
    };
    updateDisplay();
  }, [currentInput]);

  const handleNumberClick = (num) => {
    if (currentInput === "0" || currentInput === "-0") {
      setCurrentInput(num.toString());
    } else {
      setCurrentInput((prev) => prev.toString() + num.toString());
    }
  };

  const handleOperatorClick = (op) => {
    // Remove consecutive operators (excluding the negative sign)
    const sanitizedInput = currentInput.replace(/([+/*])+/g, "$1");
  
    // If the last character is a negative sign, append the operator
    if (currentInput.endsWith("-")) {
      const sanitizedInput = currentInput.replace(/([+/*-])+/g, "");
      setCurrentInput(sanitizedInput + op);
    } else {
      setCurrentInput(sanitizedInput + op);
    }
  };
  

  const handleDecimalClick = () => {
    const inputSegments = currentInput.split(/[+\-*/]/);
    const lastSegment = inputSegments[inputSegments.length - 1];
    console.log("lastSegment", lastSegment);

    if (!lastSegment.includes(".")) {
      setCurrentInput((prev) => prev + ".");
    }
  };

  const handleEqualsClick = () => {
    try {
      const result = evaluate(currentInput);
      setDisplay(result.toFixed(4).replace(/\.?0+$/, ""));
      setCurrentInput(result.toString());
    } catch (error) {
      setDisplay("Error");
      setCurrentInput("");
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setCurrentInput("");
  };

  return (
    <div>
      <div id="display" className="display">
        {display}
      </div>
      <div id="calculator" className="container">
        <button id="zero" onClick={() => handleNumberClick(0)}>
          0
        </button>
        <button id="one" onClick={() => handleNumberClick(1)}>
          1
        </button>
        <button id="two" onClick={() => handleNumberClick(2)}>
          2
        </button>
        <button id="three" onClick={() => handleNumberClick(3)}>
          3
        </button>
        <button id="four" onClick={() => handleNumberClick(4)}>
          4
        </button>
        <button id="five" onClick={() => handleNumberClick(5)}>
          5
        </button>
        <button id="six" onClick={() => handleNumberClick(6)}>
          6
        </button>
        <button id="seven" onClick={() => handleNumberClick(7)}>
          7
        </button>
        <button id="eight" onClick={() => handleNumberClick(8)}>
          8
        </button>
        <button id="nine" onClick={() => handleNumberClick(9)}>
          9
        </button>
        <button id="add" onClick={() => handleOperatorClick("+")}>
          +
        </button>
        <button id="subtract" onClick={() => handleOperatorClick("-")}>
          -
        </button>
        <button id="multiply" onClick={() => handleOperatorClick("*")}>
          *
        </button>
        <button id="divide" onClick={() => handleOperatorClick("/")}>
          /
        </button>
        <button id="decimal" onClick={handleDecimalClick}>
          .
        </button>
        <button id="equals" onClick={handleEqualsClick}>
          =
        </button>
        <button id="clear" onClick={handleClearClick}>
          AC
        </button>
      </div>
    </div>
  );
}

export default App;
