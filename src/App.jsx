import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "review resources", isCompleted: false },
    { id: 2, title: "take notes", isCompleted: false },
    { id: 3, title: "code out app", isCompleted: false },
  ]);

  const handleAddTodo = (newTodo) => {
    console.log("App received new todo:", newTodo);

    const newTodoItem = {
      id: todoList.length + 1, 
      title: newTodo,
      isCompleted: false,
    };

    setTodoList([...todoList, newTodoItem]);
  };

  const completeTodo = (id) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };

  console.log("Current todoList in App:", todoList);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
