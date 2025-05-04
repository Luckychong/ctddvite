import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, isLoading, onToggleComplete, onUpdateTodo }) => {
  if (isLoading) return <p>Loading...</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onComplete={onToggleComplete}
          onUpdate={onUpdateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
