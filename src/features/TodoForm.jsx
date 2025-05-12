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
    
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSaving}
        />
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Adding..." : "Add Todo"}
        </button>
      </form>
   
  );
};

export default TodoForm;
