import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import { useInputField } from "./hooks";

const Navigation = () => {
  const spacing = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={spacing}>
        stories
      </Link>
      <Link to="/create" style={spacing}>
        add story
      </Link>
      <Link to="/about" style={spacing}>
        info
      </Link>
    </div>
  );
};

const Story = ({ story }) => {
  return (
    <div>
      <h2>{story.content}</h2>
    </div>
  );
};

const StoryList = ({ stories }) => (
  <div>
    <h2>Stories</h2>
    <ul>
      {stories.map((story) => (
        <li key={story.id}>
          <Link to={`/stories/${story.id}`}>{story.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About story app</h2>
    <p>According to legend:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is &quot;a story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Credits = () => (
  <div>
    Story app for <a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateStory = ({ onAddStory, onSetStatus }) => {
  const { onReset: resetContentVal, ...contentVal } = useInputField("text");
  const { onReset: resetCreatorVal, ...creatorVal } = useInputField("text");
  const { onReset: resetSourceVal, ...sourceVal } = useInputField("text");
  const nav = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();
    onAddStory({
      content: contentVal.value,
      author: creatorVal.value,
      info: sourceVal.value,
      votes: 0,
    });
    nav("/");
    onSetStatus(`New story "${contentVal.value}" added successfully!`);
  };

  const onFormReset = (e) => {
    e.preventDefault();
    resetContentVal();
    resetCreatorVal();
    resetSourceVal();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

const RootApp = () => {
  const [storyList, setStoryList] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [status, setStatus] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setStatus(null);
    }, 4000);
    return () => {
      clearTimeout(timerId);
    };
  }, [status]);

  const match = useMatch("/stories/:id");
  const story = match
    ? storyList.find((story) => story.id === Number(match.params.id))
    : null;

  const addStory = (story) => {
    story.id = Math.round(Math.random() * 10000);
    setStoryList(storyList.concat(story));
  };

  return (
    <div>
      <h1>Folklore Library</h1>
      <Navigation />
      {status}
      <Routes>
        <Route path="/" element={<StoryList stories={storyList} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/create"
          element={
            <CreateStory onAddStory={addStory} onSetStatus={setStatus} />
          }
        />
        <Route path="/stories/:id" element={<Story story={story} />} />
      </Routes>
      <Credits />
    </div>
  );
};

export default RootApp;
