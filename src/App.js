import React from "react";
import "./App.css";
import { Router, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Signup/Singup";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/" exact component={Home} />
    </BrowserRouter>
  );
}

export default App;
