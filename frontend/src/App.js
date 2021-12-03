import React, { Fragment } from "react";
import "./App.css";


import InputTodo from "./components/inputtodo";
import ListTodos from "./components/listtodo";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
