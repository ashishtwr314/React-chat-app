import React from "react";
import "./App.css";
import { Router, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Signup/Singup";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Route path="/signup" excat component={Signup} />
      <Route path="/login" excat component={Login} />
      <Route path="/dashboard" excat component={Dashboard} />
      <Route path="/" excat render={() => <h1>Hii</h1>} />
    </BrowserRouter>
  );
}

export default App;
