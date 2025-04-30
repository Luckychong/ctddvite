import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({ onAddTodo }) {
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim()) {
      onAddTodo(todo);
      setTodo("");
      inputRef.current.focus();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInputWithLabel
        elementId="todoInput"
        label="Todo"
        ref={inputRef}
        value={todo}
        onChange={handleChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
