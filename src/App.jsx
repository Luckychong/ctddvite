import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "review resources" },
    { id: 2, title: "take notes" },
    { id: 3, title: "code out app" },
  ]);

  const handleAddTodo = (newTodo) => {
    const newTodoItem = {
      id: todos.length + 1,
      title: newTodo,
    };
    setTodos([...todos, newTodoItem]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />

  
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
