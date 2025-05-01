import React, { useState } from "react";

const TodoForm = ({ onAddTodo, isSaving }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({ title, isCompleted: false });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
        disabled={isSaving}
      />
      <button
        type="submit"
        className="add-btn"
        disabled={isSaving || !title.trim()}
      >
        {isSaving ? "Processing..." : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
