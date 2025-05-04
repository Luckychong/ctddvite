import React, { useState, useEffect } from "react";

const TodoListItem = ({ todo, onComplete, onUpdate }) => {
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo.title]); 

  return (
    <li style={{ marginTop: "1rem" }}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onComplete(todo.id)}
      />
      <input
        type="text"
        value={workingTitle}
        onChange={(e) => setWorkingTitle(e.target.value)}
        onBlur={() => onUpdate({ ...todo, title: workingTitle })}
        style={{
          textDecoration: todo.isCompleted ? "line-through" : "none",
          marginLeft: "0.5rem",
        }}
      />
    </li>
  );
};

export default TodoListItem;
