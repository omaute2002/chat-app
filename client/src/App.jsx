import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";

function App() {
  const [user, setUser] = useState(null);
  const [secret, setSecret] = useState(null);
  const isAuth = Boolean(user) && Boolean(secret);

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuth ? (
                  <Navigate to="/chat " />
                ) : (
                  <Login setUser={setUser} setSecret={setSecret} />
                )
              }
            ></Route>
            <Route
              path="/chat"
              element={
                isAuth ? ( // will only allow chat route if user is A
                  // authenticated
                  <Chat user={user} secret={secret} />
                ) : (
                  <Navigate to="/" />
                )
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
