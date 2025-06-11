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

  const calculateResult = () => {
    try {
      const result = eval(input); 
      setInput(result);
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
