import React, { useState } from "react";

const TodoForm = ({ handleAddTodo, isSaving }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    handleAddTodo({ title: newTodo.trim() });
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
        style={{ padding: "0.5rem", width: "100%" }}
        disabled={isSaving}
      />
      <button type="submit" disabled={isSaving} style={{ marginTop: "0.5rem" }}>
        {isSaving ? "Saving..." : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
