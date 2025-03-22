import React from "react";
import "./App.css";
import TodoList from "./TodoList"; // Import TodoList
import TodoForm from "./TodoForm"; // Import TodoForm

function App() {
  // Array of todos
  const todos = [
    { id: 1, title: "review resources" },
    { id: 2, title: "take notes" },
    { id: 3, title: "code out app" },
  ];

  return (
    <div>
      <h1>Todo List</h1>
      {/* Add the TodoForm */}
      <TodoForm />
      {/* Pass the todos array as a prop to TodoList */}
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
