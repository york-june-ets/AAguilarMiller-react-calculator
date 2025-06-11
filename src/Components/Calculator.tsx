import { useState } from "react";

export function Calculator() {
  const [input, setInput] = useState<string>("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  function EvaluateProblem(expr: string): number {
    const tokens = expr.match(/(\d+(\.\d+)?|\+|\-|\*|\/|\(|\))/g);
    if (!tokens) throw new Error("Invalid input");
  
    let pos = 0;
  
    function Expression(): number {
      let result = Operator();
      while (tokens![pos] === '+' || tokens![pos] === '-') {
        const op = tokens![pos++];
        const right = Operator();
        result = op === '+' ? result + right : result - right;
      }
      return result;
    }
  
    function Operator(): number {
      let result = Factor();
      while (tokens![pos] === '*' || tokens![pos] === '/') {
        const op = tokens![pos++];
        const right = Factor();
        if (op === '*') result *= right;
        else result /= right;
      }
      return result;
    }
  
    function Factor(): number {
      const token = tokens![pos++];
      if (token === '(') {
        const result = Expression();
        if (tokens![pos++] !== ')') throw new Error("Mismatched parentheses");
        return result;
      } else if (!isNaN(Number(token))) {
        return parseFloat(token!);
      } else {
        throw new Error("Invalid token: " + token);
      }
    }
  
    const result = Expression();
    if (pos < tokens.length) throw new Error("Unexpected token");
    return result;
  }

  const calculateResult = () => {
    try {
      const result = EvaluateProblem(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const buttons = [
    "0","1","2","3",
    "4","5", "6",
    "7", "8", "9",    
     ".", "-",
    "+","/","*","=",
  ];

  return (
    <div className="calculator-container">
      <div className="display-text">
        {input || "0"}
      </div>
      <div className="grid">
        <button onClick={handleClear} className="clear">C</button>
        <button onClick={handleBackspace} className="delete">⌫</button>
        {buttons.map((btn) => (
          <button
            className="change-button"
            onClick={() => {
              if (btn === "=") calculateResult();
              else handleClick(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
