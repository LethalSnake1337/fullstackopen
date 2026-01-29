import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import tallier from "./tallier";

const store = createStore(tallier);

const App = () => {
  const recordPositive = () => {
    store.dispatch({
      type: "POSITIVE",
    });
  };

  const recordNeutral = () => {
    store.dispatch({
      type: "NEUTRAL",
    });
  };

  const recordNegative = () => {
    store.dispatch({
      type: "NEGATIVE",
    });
  };

  const clearResults = () => {
    store.dispatch({
      type: "RESET",
    });
  };

  return (
    <div>
      <button onClick={recordPositive}>positive</button>
      <button onClick={recordNeutral}>neutral</button>
      <button onClick={recordNegative}>negative</button>
      <button onClick={clearResults}>clear results</button>
      <div>positive {store.getState().positive}</div>
      <div>neutral {store.getState().neutral}</div>
      <div>negative {store.getState().negative}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const render = () => {
  root.render(<App />);
};

render();
store.subscribe(render);
