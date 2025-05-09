import React, { useState } from "react";

const TodoForm = ({ onAddTodo, isSaving }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({ title: title.trim() });
      setTitle("");
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "70%", padding: "0.25rem", marginRight: "0.5rem" }}
          disabled={isSaving}
        />
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
