import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Root from "./Root";
import hub from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={hub}>
    <Root />
  </Provider>,
);
