import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, isLoading, onToggleComplete, onUpdateTodo }) => {
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!todos || todos.length === 0) {
    return <div className="no-todos">No todos found</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-list-item">
          <TodoListItem
            todo={todo}
            onCompleteTodo={onToggleComplete}
            onUpdateTodo={onUpdateTodo}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
