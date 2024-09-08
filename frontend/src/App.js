import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import MyHabits from "Components/MyHabits";
import Register from "Components/User/Register";
import Signin from "Components/User/Signin/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Welcome} exact={true} />
        <Route path="/habits" Component={MyHabits} exact={true} />
        <Route path="/register" Component={Register} exact={true} />
        <Route path="/signin" Component={Signin} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
