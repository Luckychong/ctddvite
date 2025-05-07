import React, { useState, useEffect } from "react";

const TodoListItem = ({
  todo,
  handleUpdate,
  onCompleteTodo,
  setIsEditing,
  isEditing,
  handleCancel,
  handleEdit,
}) => {
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);
  

  
  return (
    <form onSubmit={handleUpdate}>
      {isEditing ? (
        <>
          <TextInputWithLabel
            elementId={`edit-todo-${todo.id}`}
            label="Edit Todo"
            value={workingTitle}
            onChange={handleEdit}
          />
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Update</button>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              id={`checkbox${todo.id}`}
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
            />
          </label>
          <span onClick={() => setIsEditing(true)}>{todo.title}</span>
        </>
      )}
    </form>
  );
};

export default TodoListItem;