const initialState = {
  positive: 0,
  neutral: 0,
  negative: 0,
};

const tallier = (state = initialState, action) => {
  switch (action.type) {
    case "POSITIVE":
      return { ...state, positive: state.positive + 1 };
    case "NEUTRAL":
      return { ...state, neutral: state.neutral + 1 };
    case "NEGATIVE":
      return { ...state, negative: state.negative + 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default tallier;
