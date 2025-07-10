import {useState, useEffect} from 'react';

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [theme, setTheme] = useState("light");

  const ops = ['/', '*', '+', '-', '.'];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const safeEval = (expression) => {
    try {
      // Basic safety check for allowed characters only
      if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
        throw new Error('Invalid expression');
      }
      // eslint-disable-next-line no-eval
      return eval(expression);
    } catch (error) {
      return "Error";
    }
  };

  const updateCalc = value => {
    if ((ops.includes(value) && calc === '') ||
        (ops.includes(value) && ops.includes(calc.slice(-1)))
    ){
      return;
    }
    setCalc(calc + value);

    if(!ops.includes(value))  {
      try {
        setResult(safeEval(calc + value.toString()));
      } catch (error) {
        setResult("Error");
      }
    }
  }

  const updateCalcWithParens = value => {
    setCalc(calc + value);
    try {
      // Only show preview if expression is valid
      if (calc + value) {
        setResult(safeEval(calc + value));
      }
    } catch (error) {
      // Don't update result if expression is invalid
    }
  };

  const createDigits = () =>{
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
      <button onClick={() => updateCalc(i.toString()
        )} key={i}>{i}
      </button>)     
    }
    return digits;
  }
  
  const calculate = () => {
    try {
      setCalc(safeEval(calc).toString());      
    } catch (error) {
      setCalc("Error");
    }
  }

  const deleteLast = () => {
    if(calc === '')  {
      return;
    }

    const value = calc.slice(0,-1);
    setCalc(value);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="calculator-header">
          <div className="calculator-title">Calculator</div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
        <div className="display">
          { result ? <span>({result})</span>: ''} {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteLast}>DELETE</button>
        </div>
        <div className="operators">
          <button onClick={() => updateCalcWithParens('(')}>(</button>
          <button onClick={() => updateCalcWithParens(')')}>)</button>
          <button onClick={() => setCalc('')}>CLEAR</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
        </div>
      </div>
    </div>
  );
}

export default App;
