import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import MyHabits from "Components/MyHabits";
import Register from "Components/User/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Welcome} exact={true} />
        <Route path="/habits" Component={MyHabits} exact={true} />
        <Route path="/register" Component={Register} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
