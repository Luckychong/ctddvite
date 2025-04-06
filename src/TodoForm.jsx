import React, { useState, useRef } from "react";

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  const todoTitleInput = useRef(null);

  const handleAddTodo = (event) => {
    event.preventDefault(); 

    
    if (inputValue.trim()) {
      onAddTodo(inputValue); 
      setInputValue(""); 
      todoTitleInput.current.focus(); 
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={todoTitleInput} 
        placeholder="Enter Todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
