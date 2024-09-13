import { useState } from "react";

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

const Feedback = ({ children }) => {
  return (
    <div>
      <h1>give feedback</h1>
      {children}
    </div>
  );
};

const Statistic = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <h1>statistic</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGood = () => {
    setGood(good + 1);
  };
  const onNeutral = () => {
    setNeutral(neutral + 1);
  };
  const OnBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <Feedback>
        <Button onClick={onGood}>good</Button>
        <Button onClick={onNeutral}>neutral</Button>
        <Button onClick={OnBad}>bad</Button>
      </Feedback>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
