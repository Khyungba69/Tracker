import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import MyHabits from "Components/MyHabits";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Welcome} exact={true} />
        <Route path="/habits" Component={MyHabits} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
