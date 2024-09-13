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

const StaticsticLine = ({ text, value }) => {
  return (
    <div>
      <p>
        {text} {value}
      </p>
    </div>
  );
};

const Statistic = ({ feedbackExists, good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;
  return (
    <>
      {feedbackExists ? (
        <div>
          <h1>statistic</h1>
          <StaticsticLine text="good" value={good} />
          <StaticsticLine text="neutral" value={neutral} />
          <StaticsticLine text="bad" value={bad} />
          <StaticsticLine text="all" value={all} />
          <StaticsticLine text="average" value={average} />
          <StaticsticLine text="positive" value={positive + "%"} />
        </div>
      ) : (
        <div>
          <p>No feedback given</p>
        </div>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedbackExists, setFeedbackExists] = useState(false);

  const onGood = () => {
    setGood(good + 1);
    setFeedbackExists(true);
  };
  const onNeutral = () => {
    setNeutral(neutral + 1);
    setFeedbackExists(true);
  };
  const OnBad = () => {
    setBad(bad + 1);
    setFeedbackExists(true);
  };

  return (
    <>
      <Feedback>
        <Button onClick={onGood}>good</Button>
        <Button onClick={onNeutral}>neutral</Button>
        <Button onClick={OnBad}>bad</Button>
      </Feedback>
      <Statistic
        feedbackExists={feedbackExists}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  );
};

export default App;
