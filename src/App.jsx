import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "review resources" },
    { id: 2, title: "take notes" },
    { id: 3, title: "code out app" },
  ]);

  const handleAddTodo = (newTodo) => {
    console.log("App received new todo:", newTodo); 

    const newTodoItem = {
      id: todoList.length + 1,
      title: newTodo,
    };
    setTodoList([...todoList, newTodoItem]);
  };

  console.log("Current todoList in App:", todoList); 

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
