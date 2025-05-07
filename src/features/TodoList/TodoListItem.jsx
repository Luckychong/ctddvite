import React, { useState, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

 const TodoListItem = ({ todo, onCompleteTodo, onUpdateTodo }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [workingTitle, setWorkingTitle] = useState(todo.title);

   useEffect(() => {
     setWorkingTitle(todo.title);
   }, [todo]);

   const handleEdit = (e) => {
     setWorkingTitle(e.target.value);
   };

   const handleUpdate = (e) => {
     e.preventDefault();
     if (workingTitle.trim() !== "") {
       onUpdateTodo({ ...todo, title: workingTitle });
       setIsEditing(false);
     }
   };

   const handleCancel = () => {
     setWorkingTitle(todo.title);
     setIsEditing(false);
   };

   const handleTitleClick = () => {
     setIsEditing(true);
   };

   return (
     <div className="todo-item">
       {isEditing ? (
         <form onSubmit={handleUpdate}>
           <TextInputWithLabel
             elementId={`edit-todo-${todo.id}`}
             label="Edit Todo"
             value={workingTitle}
             onChange={handleEdit}
           />
           <div className="button-group">
             <button type="button" onClick={handleCancel}>
               Cancel
             </button>
             <button type="submit">Update</button>
           </div>
         </form>
       ) : (
         <div className="todo-display">
           <label className="checkbox-label">
             <input
               type="checkbox"
               id={`checkbox${todo.id}`}
               checked={todo.isCompleted}
               onChange={() => onCompleteTodo(todo.id)}
             />
             <span
               className={`todo-title ${todo.isCompleted ? "completed" : ""}`}
               onClick={handleTitleClick}
               style={{ cursor: "pointer" }}
             >
               {todo.title}
             </span>
           </label>
         </div>
       )}
     </div>
   );
 };

 export default TodoListItem;