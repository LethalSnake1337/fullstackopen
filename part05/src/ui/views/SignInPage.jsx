import { useState } from "react";
import Alert from "../common/Alert";

const SignInPage = ({ onSignIn }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const success = await onSignIn(credentials);
    if (success) setCredentials({ username: "", password: "" });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        username
        <input
          id="signin-username"
          type="text"
          value={credentials.username}
          name="username"
          onChange={handleInputChange}
        />
      </div>
      <div>
        password
        <input
          id="signin-password"
          type="password"
          value={credentials.password}
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <button id="signin-submit" type="submit">
        login
      </button>
    </form>
  );
};

export default SignInPage;
