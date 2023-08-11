import React from "react";
import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";

function Login({ setUser, setSecret }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]); // eslint-disable-line

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <h2 className="title">CHAT APP</h2>
          <p
            className="register-change"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Already a user?" : "Are you a new User?"}
          </p>
          <div>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="login-input"
              placeholder="Username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-actions">
            {isRegister ? (
              <button type="button" onClick={handleRegister}>
                Register
              </button>
            ) : (
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
